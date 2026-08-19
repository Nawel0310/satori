/**
 * Records a ~90s desktop walkthrough video of the deployed Satori demo
 * (https://nawel0310.github.io/satori/) for client presentations, at
 * 1920x1080. Order: login -> crear cliente -> crear recordatorio -> crear
 * producción -> arrastrar una tarjeta en el embudo -> crear presupuesto ->
 * enviarlo por email dos veces (la segunda dispara y confirma el diálogo de
 * reenvío) -> dashboard. A synthetic cursor dot is drawn on the page so
 * mouse movement/clicks are visible in the recording, and typing/clicks are
 * paced slower on forms, faster on plain "look at this screen" moments.
 *
 * Usage: pnpm record:demo:desktop
 * Output: recordings/satori-demo-desktop.mp4 (also keeps the raw .webm)
 *
 * Requires: chromium via `npx playwright install chromium`, and `ffmpeg`
 * on PATH to convert the .webm Playwright produces into a shareable .mp4.
 */
import { chromium } from "@playwright/test";
import { execFile } from "node:child_process";
import { mkdir, readdir, rename } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const BASE_URL = "https://nawel0310.github.io/satori/";
const OUT_DIR = path.resolve("recordings");
const RAW_DIR = path.join(OUT_DIR, "raw-desktop");
const VIEWPORT = { width: 1920, height: 1080 };

const CURSOR_INIT_SCRIPT = () => {
  const CURSOR_ID = "__pw_fake_cursor";
  function setup() {
    if (document.getElementById(CURSOR_ID)) return;
    const cursor = document.createElement("div");
    cursor.id = CURSOR_ID;
    Object.assign(cursor.style, {
      position: "fixed",
      top: "0px",
      left: "0px",
      width: "22px",
      height: "22px",
      marginLeft: "-11px",
      marginTop: "-11px",
      borderRadius: "50%",
      background: "rgba(220, 38, 38, 0.55)",
      border: "2px solid #ffffff",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.5)",
      pointerEvents: "none",
      zIndex: "2147483647",
      transition: "transform 60ms linear",
      willChange: "transform",
    });
    document.documentElement.appendChild(cursor);

    window.addEventListener(
      "mousemove",
      (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      },
      { capture: true },
    );

    function pulse() {
      cursor.animate(
        [
          { boxShadow: "0 0 0 0 rgba(220,38,38,0.5)" },
          { boxShadow: "0 0 0 14px rgba(220,38,38,0)" },
        ],
        { duration: 350, easing: "ease-out" },
      );
    }
    window.addEventListener("mousedown", pulse, { capture: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
};

let cursorPos = { x: VIEWPORT.width / 2, y: VIEWPORT.height / 2 };

async function moveMouseTo(page, x, y) {
  const dist = Math.hypot(x - cursorPos.x, y - cursorPos.y);
  const steps = Math.max(12, Math.min(60, Math.round(dist / 12)));
  await page.mouse.move(x, y, { steps });
  cursorPos = { x, y };
}

async function moveToLocator(page, locator, yFrac = 0.5) {
  await locator.waitFor({ state: "visible" });
  // Raw mouse.move/down/up (used so the fake cursor overlay tracks real
  // input) doesn't auto-scroll like locator.click() does, so an element
  // below the fold would otherwise get coordinates outside the viewport.
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) throw new Error("No se pudo ubicar el elemento en pantalla.");
  const x = box.x + box.width / 2;
  const y = box.y + box.height * yFrac;
  await moveMouseTo(page, x, y);
  return { x, y };
}

async function clickLocator(page, locator, { pauseBefore = 200, pauseAfter = 300 } = {}) {
  await moveToLocator(page, locator);
  await page.waitForTimeout(pauseBefore);
  await page.mouse.down();
  await page.waitForTimeout(70);
  await page.mouse.up();
  await page.waitForTimeout(pauseAfter);
}

async function typeInto(page, locator, text, { delay = 60, clearFirst = false } = {}) {
  await clickLocator(page, locator, { pauseBefore: 150, pauseAfter: 200 });
  if (clearFirst) {
    await page.keyboard.press("Control+a");
    await page.waitForTimeout(100);
  }
  await page.keyboard.type(text, { delay });
}

async function goTo(page, linkName, headingName, pause = 1000) {
  await clickLocator(page, page.getByRole("link", { name: linkName, exact: true }));
  await page.getByRole("heading", { name: headingName }).waitFor();
  await page.waitForTimeout(pause);
}

async function dragCardToColumn(page, cardText, columnName) {
  const card = page.getByText(cardText, { exact: true });
  await card.waitFor({ state: "visible" });
  const cardBox = await card.boundingBox();
  // Walk up from the column heading to its column wrapper (the actual HTML5
  // drop target) so the drop point scales with however many cards are in it,
  // instead of guessing a fixed pixel offset below the heading.
  const columnWrapper = page
    .getByRole("heading", { name: columnName })
    .locator('xpath=ancestor::div[contains(@class, "rounded-md")][1]');
  await columnWrapper.waitFor({ state: "visible" });
  const columnBox = await columnWrapper.boundingBox();

  const startX = cardBox.x + cardBox.width / 2;
  const startY = cardBox.y + cardBox.height / 2;
  const endX = columnBox.x + columnBox.width / 2;
  const endY = columnBox.y + columnBox.height * 0.6; // safely inside the column body

  await moveMouseTo(page, startX, startY);
  await page.waitForTimeout(400);
  await page.mouse.down();
  await page.waitForTimeout(200);
  // Drag in two slow legs so the "isOver" highlight on the target column has
  // time to render before drop, and the cursor glide is clearly visible.
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  await page.mouse.move(midX, midY, { steps: 30 });
  await page.waitForTimeout(200);
  await page.mouse.move(endX, endY, { steps: 30 });
  cursorPos = { x: endX, y: endY };
  await page.waitForTimeout(500);
  await page.mouse.up();
  await page.waitForTimeout(1200);
}

async function runScript(page) {
  // 1. Login
  await page.goto(`${BASE_URL}login`);
  await page.waitForTimeout(1500);
  await typeInto(page, page.getByLabel("Usuario"), "satori");
  await page.waitForTimeout(300);
  await typeInto(page, page.getByLabel("Contraseña"), "satori2026");
  await page.waitForTimeout(500);
  await clickLocator(page, page.getByRole("button", { name: "Ingresar" }));
  await page.waitForURL("**/dashboard");
  await page.getByRole("heading", { name: "Panorama general" }).waitFor();
  await page.waitForTimeout(2000);

  // 2. Clientes -> nuevo cliente
  await goTo(page, "Clientes", "Clientes y agencias");
  await clickLocator(page, page.getByRole("button", { name: "+ Nuevo cliente" }));
  await page.waitForTimeout(500);
  await typeInto(page, page.getByLabel("Nombre del cliente o agencia"), "Hotel Boutique Costanera");
  await page.waitForTimeout(300);
  await typeInto(page, page.getByLabel("Nombre de contacto"), "Julieta Ramos");
  await page.waitForTimeout(300);
  await typeInto(page, page.getByLabel("Email de contacto"), "julieta@hotelcostanera.com");
  await page.waitForTimeout(700);
  await clickLocator(page, page.getByRole("button", { name: "Guardar cliente" }));
  await page.waitForTimeout(900);

  // 3. Recordatorios -> nuevo recordatorio
  await goTo(page, "Recordatorios", "Recordatorios");
  await clickLocator(page, page.getByRole("button", { name: "+ Nuevo recordatorio" }));
  await page.waitForTimeout(500);
  await typeInto(page, page.getByLabel("Recordatorio"), "Confirmar rodaje con Hotel Boutique Costanera");
  await page.waitForTimeout(700);
  await clickLocator(page, page.getByRole("button", { name: "Guardar recordatorio" }));
  await page.waitForTimeout(900);

  // 4. Producciones -> nueva producción
  await goTo(page, "Producciones", "Producciones");
  await clickLocator(page, page.getByRole("button", { name: "+ Nueva producción" }));
  await page.waitForTimeout(500);
  await typeInto(page, page.getByLabel("Título de la producción"), "Recorrido aéreo de lanzamiento");
  await page.waitForTimeout(300);
  await typeInto(page, page.getByLabel("Cliente", { exact: true }), "constructora", {
    delay: 90,
    clearFirst: true,
  });
  await page.waitForTimeout(500);
  await clickLocator(page, page.getByRole("option", { name: "Constructora Río" }));
  await moveToLocator(page, page.getByLabel("Categoría"));
  await page.waitForTimeout(300);
  await page.getByLabel("Categoría").selectOption({ label: "Drone" });
  await page.waitForTimeout(700);
  await clickLocator(page, page.getByRole("button", { name: "Guardar producción" }));
  await page.waitForTimeout(900);

  // 5. Embudo (Kanban) -> arrastrar una tarjeta de "Propuesta" a "Aprobada"
  await goTo(page, "Embudo", "Embudo de propuestas", 1400);
  await dragCardToColumn(page, "Video drone lanzamiento", "Aprobada");
  await page.waitForTimeout(900);

  // 6. Presupuestos -> nuevo presupuesto (con plantilla) -> vista cliente -> enviar por email
  await goTo(page, "Presupuestos", "Presupuestos");
  await clickLocator(page, page.getByRole("button", { name: "+ Nuevo presupuesto" }));
  await page.waitForTimeout(500);
  await moveToLocator(page, page.getByLabel("Plantilla reutilizable"));
  await page.waitForTimeout(300);
  await page.getByLabel("Plantilla reutilizable").selectOption({ index: 1 });
  await page.waitForTimeout(1400);
  await clickLocator(page, page.getByRole("button", { name: "Guardar presupuesto" }));
  await page.waitForTimeout(800);

  // Abrir la vista del cliente del presupuesto recién creado (primera fila
  // de la tabla, la más reciente) y probar el envío por email dos veces: la
  // primera manda el correo directo, la segunda dispara el diálogo "ya se
  // envió" y confirmamos "Enviar de nuevo" ahí.
  await clickLocator(page, page.locator("table tbody tr").first().getByRole("link").first());
  const sendEmailButton = page.getByRole("button", { name: "Enviar por Email" });
  await sendEmailButton.waitFor({ state: "visible" });
  await page.waitForTimeout(900);
  await clickLocator(page, sendEmailButton);
  await page.waitForTimeout(1100);
  await clickLocator(page, sendEmailButton);
  const resendConfirm = page.getByRole("button", { name: "Enviar de nuevo" });
  await resendConfirm.waitFor({ state: "visible" });
  await page.waitForTimeout(600);
  await clickLocator(page, resendConfirm);
  await page.waitForTimeout(1100);

  // 7. Cierre en dashboard
  await goTo(page, "General", "Panorama general", 2200);
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: RAW_DIR, size: VIEWPORT },
  });
  await context.addInitScript(CURSOR_INIT_SCRIPT);
  const page = await context.newPage();

  try {
    await runScript(page);
  } finally {
    await context.close();
    await browser.close();
  }

  const files = await readdir(RAW_DIR);
  const webm = files.find((f) => f.endsWith(".webm"));
  if (!webm) throw new Error("Playwright no generó ningún archivo .webm.");

  const webmOut = path.join(OUT_DIR, "satori-demo-desktop.webm");
  await rename(path.join(RAW_DIR, webm), webmOut);

  const mp4Out = path.join(OUT_DIR, "satori-demo-desktop.mp4");
  await execFileAsync("ffmpeg", [
    "-y",
    "-i",
    webmOut,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    mp4Out,
  ]);

  console.log(`Video listo: ${mp4Out}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
