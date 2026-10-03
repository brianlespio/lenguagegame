import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/lenguagegame/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        matematicas: resolve(root, "matematicas.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: "./src/test/setup.ts",
    restoreMocks: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    pool: "forks",
    maxWorkers: 2,
  },
});
