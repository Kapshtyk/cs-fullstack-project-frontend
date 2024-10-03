import react from "@vitejs/plugin-react";
import path from "path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src"),
      "@/nextApp": path.resolve(__dirname, "./app"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/views": path.resolve(__dirname, "./src/views"),
      "@/widgets": path.resolve(__dirname, "./src/widgets"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/entities": path.resolve(__dirname, "./src/entities"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["__tests__/**/*.test.tsx"],
    setupFiles: ["./vitest.setup.ts"],
    env: loadEnv(mode, process.cwd(), ""),
    coverage: {
      provider: "v8",
    },
  },
  deps: {
    inline: ["@testing-library/jest-dom"],
  },
}));
