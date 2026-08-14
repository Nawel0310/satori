"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ClientLogo } from "@/components/crm/ClientLogo";

const OUTPUT_SIZE = 256;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

interface ClientLogoUploadProps {
  name: string;
  value?: string;
  onChange: (logoUrl: string | undefined) => void;
}

function compressToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read-error"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode-error"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = OUTPUT_SIZE;
        canvas.height = OUTPUT_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("canvas-error"));
          return;
        }
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

        const scale = Math.max(OUTPUT_SIZE / img.width, OUTPUT_SIZE / img.height);
        const sWidth = OUTPUT_SIZE / scale;
        const sHeight = OUTPUT_SIZE / scale;
        const sx = (img.width - sWidth) / 2;
        const sy = (img.height - sHeight) / 2;
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function ClientLogoUpload({ name, value, onChange }: ClientLogoUploadProps) {
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File | null | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus("error");
      setErrorMessage("Elegí un archivo de imagen.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setStatus("error");
      setErrorMessage("La imagen es demasiado grande (máx. 8MB).");
      return;
    }

    setStatus("processing");
    try {
      const dataUrl = await compressToDataUrl(file);
      onChange(dataUrl);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo procesar la imagen.");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-primary">Logo</label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          void processFile(e.dataTransfer.files[0]);
        }}
        className={`flex items-center gap-4 rounded-md border border-dashed p-4 transition-colors duration-200 ${
          isDraggingOver ? "border-primary bg-surface" : "border-border"
        }`}
      >
        <ClientLogo name={name} logoUrl={value} size="lg" />

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-xs text-secondary">Arrastrá una imagen acá o subila desde tu equipo.</p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
              Subir logo
            </Button>
            {value ? (
              <Button type="button" variant="ghost" onClick={() => onChange(undefined)}>
                Quitar logo
              </Button>
            ) : null}
          </div>
          {status === "processing" ? <p className="text-xs text-secondary">Procesando imagen…</p> : null}
          {status === "error" ? <p className="text-xs text-primary">{errorMessage}</p> : null}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            void processFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
