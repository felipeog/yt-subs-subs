import path from "path";
import fs from "fs";

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const srcPath = path.resolve("./src");
const directoryEntries = fs.readdirSync(srcPath, { withFileTypes: true });
const absolutePathAliases = directoryEntries.reduce((acc, directoryEntry) => {
  if (directoryEntry.isDirectory()) {
    return {
      ...acc,
      [directoryEntry.name]: path.join(srcPath, directoryEntry.name),
    };
  }

  return acc;
}, {});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: absolutePathAliases,
  },
});
