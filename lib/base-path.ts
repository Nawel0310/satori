export const BASE_PATH = "/satori";

export function withBasePath(src: string): string {
  if (/^(data:|blob:|https?:\/\/)/.test(src)) return src;
  return `${BASE_PATH}${src.startsWith("/") ? "" : "/"}${src}`;
}
