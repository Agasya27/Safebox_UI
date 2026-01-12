import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "");
  const deployTarget = env.VITE_DEPLOY_TARGET ?? "";
  const base = command === "build" && deployTarget === "github-pages" ? "/Safebox_UI/" : "/";

  return {
    base,
    server: {
      host: "::",
      port: 3000,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(rootDir, "src"),
      },
    },
  };
});