import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
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
