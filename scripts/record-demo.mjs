/**
 * Records a ~70s walkthrough video of the deployed Satori demo
 * (https://nawel0310.github.io/satori/) for client presentations.
 *
 * Usage: pnpm record:demo
 * Output: recordings/satori-demo.mp4 (also keeps the raw .webm)
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
const RAW_DIR = path.join(OUT_DIR, "raw");

async function openMenu(page) {
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.waitForTimeout(500);
}

async function goTo(page, linkName, headingName, pause = 3000) {
  await openMenu(page);
  await page.getByRole("link", { name: linkName, exact: true }).click();
  await page.getByRole("heading", { name: headingName }).waitFor();
  await page.waitForTimeout(pause);
}

async function type(page, label, text, options = {}) {
  await page.getByLabel(label, options).pressSequentially(text, { delay: 45 });
}

async function runScript(page) {
  // 1. Login
  await page.goto(`${BASE_URL}login`);
  await page.waitForTimeout(1800);
  await type(page, "Usuario", "satori");
  await type(page, "Contraseña", "satori2026");
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Ingresar" }).click();
  await page.waitForURL("**/dashboard");
  await page.getByRole("heading", { name: "Panorama general" }).waitFor();
  await page.waitForTimeout(5000);

  // 2. Clientes -> nuevo cliente
  await goTo(page, "Clientes", "Clientes y agencias");
  await page.getByRole("button", { name: "+ Nuevo cliente" }).click();
  await page.waitForTimeout(600);
  await type(page, "Nombre del cliente o agencia", "Hotel Boutique Costanera");
  await page.getByLabel("Nombre de contacto").fill("Julieta Ramos");
  await page.getByLabel("Email de contacto").fill("julieta@hotelcostanera.com");
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Guardar cliente" }).click();
  await page.waitForTimeout(2000);

  // 3. Producciones -> nueva producción
  await goTo(page, "Producciones", "Producciones");
  await page.getByRole("button", { name: "+ Nueva producción" }).click();
  await page.waitForTimeout(600);
  await type(page, "Título de la producción", "Recorrido aéreo de lanzamiento");
  await page.getByLabel("Cliente", { exact: true }).fill("constructora");
  await page.waitForTimeout(800);
  await page.getByRole("option", { name: "Constructora Río" }).click();
  await page.waitForTimeout(500);
  await page.getByLabel("Categoría").selectOption({ label: "Drone" });
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Guardar producción" }).click();
  await page.waitForTimeout(2000);

  // 4. Embudo (Kanban)
  await goTo(page, "Embudo", "Embudo de propuestas");
  await page.waitForTimeout(2500);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(2500);

  // 5. Presupuestos -> nuevo presupuesto (con plantilla)
  await goTo(page, "Presupuestos", "Presupuestos");
  await page.getByRole("button", { name: "+ Nuevo presupuesto" }).click();
  await page.waitForTimeout(1000);
  await page.getByLabel("Plantilla reutilizable").selectOption({ index: 1 });
  await page.waitForTimeout(2500);
  await page.getByRole("button", { name: "Guardar presupuesto" }).click();
  await page.waitForTimeout(2000);

  // 6. Recordatorios -> nuevo recordatorio
  await goTo(page, "Recordatorios", "Recordatorios");
  await page.getByRole("button", { name: "+ Nuevo recordatorio" }).click();
  await page.waitForTimeout(600);
  await type(page, "Recordatorio", "Confirmar rodaje con Hotel Boutique Costanera");
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Guardar recordatorio" }).click();
  await page.waitForTimeout(2000);

  // 7. Cierre en dashboard
  await goTo(page, "General", "Panorama general", 5500);
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    // 360x640 CSS px: well under the 768px "md" breakpoint (mobile hamburger
    // nav renders) and an exact 9:16 match for 1080x1920, so ffmpeg can scale
    // the raw recording straight up to the target size with no letterboxing.
    // (Playwright's recordVideo.size pads instead of scaling when it differs
    // from the actual captured frame size, so we deliberately don't set it
    // here and upscale afterwards instead.)
    viewport: { width: 360, height: 640 },
    recordVideo: { dir: RAW_DIR },
  });
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

  const webmOut = path.join(OUT_DIR, "satori-demo.webm");
  await rename(path.join(RAW_DIR, webm), webmOut);

  const mp4Out = path.join(OUT_DIR, "satori-demo.mp4");
  await execFileAsync("ffmpeg", [
    "-y",
    "-i",
    webmOut,
    "-vf",
    "scale=1080:1920:flags=lanczos",
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
