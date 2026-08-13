"use client";

import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  DEMO_CREDENTIALS,
  login,
  subscribeAuth,
  getAuthSnapshot,
  getAuthServerSnapshot,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const authenticated = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (authenticated) {
      router.replace("/dashboard");
    }
  }, [authenticated, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    if (login(username, password)) {
      router.push("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos.");
      setSubmitting(false);
    }
  }

  if (authenticated) return null;

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

          <Input
            label="Usuario"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="usuario@satori.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="mt-2 w-full" disabled={submitting}>
            {submitting ? "Ingresando…" : "Ingresar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-secondary">
          Demo interactiva — acceso mockeado, sin backend real. Usuario de prueba:{" "}
          <strong className="text-white">{DEMO_CREDENTIALS.username}</strong> / contraseña:{" "}
          <strong className="text-white">{DEMO_CREDENTIALS.password}</strong>
        </p>
      </div>
    </div>
  );
}
