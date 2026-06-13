/** Mirrors `basePath` from next.config.ts — available in client bundles. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative path with the deploy basePath (e.g. /sdvig-site on GitHub Pages). */
export function withBasePath(path: string): string {
  if (!basePath || path.startsWith("http")) return path;
  return `${basePath}${path}`;
}
