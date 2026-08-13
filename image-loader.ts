export default function imageLoader({ src }: { src: string }) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const basePath = "/satori"; //Nombre del repo
  return `${basePath}${src}`;
}