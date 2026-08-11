"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-primary px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-heading text-4xl font-bold tracking-widest text-white">SATORI</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.35em] text-secondary">
            Film &amp; Photo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-md border border-white/10 bg-white p-8 shadow-xl"
        >
          <div>
            <h1 className="font-heading text-xl font-semibold text-primary">Acceso al sistema</h1>
            <p className="mt-1 text-sm text-secondary">Sistema privado de producción.</p>
          </div>

          <Input label="Usuario" name="username" type="text" autoComplete="username" placeholder="usuario@satori.com" />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
          />

          <Button type="submit" className="mt-2 w-full" disabled={submitting}>
            {submitting ? "Ingresando…" : "Ingresar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-secondary">
          Demo interactiva, sin autenticación real.
        </p>
      </div>
    </div>
  );
}
