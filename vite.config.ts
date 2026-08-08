import { defineConfig } from "vite";
import { resolve, join, relative, parse, sep } from "node:path";
import fs from "fs";

function findHtmlFiles(dir: string): string[] {
  const results: string[] = [];

  function walk(currentDir: string): void {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".html")) {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

const blogFiles = findHtmlFiles(resolve(import.meta.dirname, "./blog"));

const blogEntries: Record<string, string> = {};

for (const filePath of blogFiles) {
  const relativePath = relative(import.meta.dirname, filePath);
  const { dir, name } = parse(relativePath);
  const withoutExt = join(dir, name);
  const key = withoutExt.split(sep).join("_");

  blogEntries[key] = filePath;
}

export default defineConfig({
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        ...blogEntries,
      },
    },
  },
});
