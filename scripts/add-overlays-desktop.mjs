/**
 * Burns text overlays (opening card, closing CTA, and short per-section
 * captions) onto the already-recorded desktop demo video, with ffmpeg. Does
 * NOT re-record anything: always reads the pristine
 * recordings/satori-demo-desktop.mp4 and writes a separate
 * recordings/satori-demo-desktop-captioned.mp4, so re-running this script is
 * idempotent regardless of how many times it's run.
 *
 * Timestamps below were determined by inspecting the actual recorded video
 * (1fps burned-in-timecode frame dump) rather than guessing from the
 * Playwright script's waitForTimeout budget, since real network/page-load
 * timing drifts a bit run to run.
 *
 * Usage: pnpm overlay:demo:desktop
 */
import { execFile } from "node:child_process";
import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const IN_FILE = path.resolve("recordings/satori-demo-desktop.mp4");
const OUT_FILE = path.resolve("recordings/satori-demo-desktop-captioned.mp4");
const FILTER_SCRIPT_PATH = path.resolve("recordings/.overlay-filtergraph.txt");

const FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";
const FADE = 0.3; // seconds

// { lines: string[], fontsize: number[], start, end, band: "section" | "card" }
const CAPTIONS = [
  { band: "card", start: 0.2, end: 6.8, lines: ["SATORI", "Gestión de Cliente y Presupuestos para producción audiovisual"], fontsize: [76, 34] },
  { band: "section", start: 13.0, end: 22.5, lines: ["Creá un cliente en segundos"], fontsize: [42] },
  { band: "section", start: 29.0, end: 38.5, lines: ["Que ningún seguimiento se pierda"], fontsize: [42] },
  { band: "section", start: 45.0, end: 54.5, lines: ["Cargá tus producciones y asignalas a un cliente"], fontsize: [42] },
  { band: "section", start: 60.5, end: 66.5, lines: ["Visualiza cada etapa de tus producciones"], fontsize: [42] },
  { band: "section", start: 69.5, end: 81.5, lines: ["Armá presupuestos con plantillas reutilizables"], fontsize: [42] },
  { band: "section", start: 83.5, end: 92.5, lines: ["Envialos por email en un click"], fontsize: [42] },
  { band: "card", start: 94.5, end: 97.4, lines: ["¿Querés verlo funcionando con tus datos?", "Escribime"], fontsize: [50, 36] },
];

function escapeDrawtext(text) {
  // Our caption strings contain no ':', ',', "'" or '%', so quoting in
  // single quotes is enough — no other escaping needed for these values.
  return text.replace(/'/g, "\\'");
}

function buildFilterGraph() {
  const filters = [];
  let label = "0:v";
  let idx = 0;

  for (const cap of CAPTIONS) {
    const isCard = cap.band === "card";
    const boxY = isCard ? 380 : 940;
    const boxH = isCard ? 320 : 140;
    const nextLabel = `v${idx++}`;

    filters.push(
      `[${label}]drawbox=x=0:y=${boxY}:w=1920:h=${boxH}:color=black@${isCard ? 0.65 : 0.55}:t=fill:` +
        `enable='between(t,${cap.start},${cap.end})'[${nextLabel}]`,
    );
    label = nextLabel;

    const lineCount = cap.lines.length;
    const lineHeight = isCard ? 90 : 0;
    const totalTextHeight = isCard ? lineHeight * lineCount : cap.fontsize[0];
    const startY = boxY + (boxH - totalTextHeight) / 2;

    cap.lines.forEach((line, i) => {
      const y = isCard ? startY + i * lineHeight + 10 : startY - 5;
      const alphaExpr = `if(lt(t,${cap.start}+${FADE}),(t-${cap.start})/${FADE},if(gt(t,${cap.end}-${FADE}),(${cap.end}-t)/${FADE},1))`;
      const outLabel = `v${idx++}`;
      filters.push(
        `[${label}]drawtext=fontfile=${FONT}:text='${escapeDrawtext(line)}':` +
          `fontsize=${cap.fontsize[i]}:fontcolor=white:x=(w-text_w)/2:y=${y}:` +
          `alpha='${alphaExpr}':enable='between(t,${cap.start},${cap.end})'[${outLabel}]`,
      );
      label = outLabel;
    });
  }

  // Final output pad must be named [out] for -map to pick it up cleanly.
  return filters.join(";\n") + `;\n[${label}]null[out]`;
}

async function main() {
  const filterGraph = buildFilterGraph();
  await writeFile(FILTER_SCRIPT_PATH, filterGraph, "utf8");

  try {
    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      IN_FILE,
      "-filter_complex_script",
      FILTER_SCRIPT_PATH,
      "-map",
      "[out]",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      OUT_FILE,
    ]);
  } finally {
    await unlink(FILTER_SCRIPT_PATH).catch(() => {});
  }

  console.log(`Video con overlays listo: ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
