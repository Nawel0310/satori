/**
 * Mocked demo auth: fixed credentials, no backend. This is a client-side
 * gate so a casual visitor doesn't land in the CRM by accident — not a
 * real security boundary. The credentials below ship in the public JS
 * bundle, readable by anyone.
 */
export const DEMO_CREDENTIALS = {
  username: "satori",
  password: "satori2026",
};

const AUTH_STORAGE_KEY = "satori-demo-auth:v1";

export function login(username: string, password: string): boolean {
  const ok = username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
  if (ok) {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, "1");
    } catch {
      // Quota exceeded, incognito/private mode, or storage disabled — ignore.
    }
  }
  return ok;
}

export function logout() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function subscribeAuth(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function getAuthSnapshot(): boolean {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function getAuthServerSnapshot(): boolean {
  return false;
}
