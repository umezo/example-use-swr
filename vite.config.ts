import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";

const originalConfig: UserConfigExport = {
  plugins: [react()],
};
const vitestConfig = {
  test: {
    environment: "happy-dom", // or 'jsdom', 'node'
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  ...originalConfig,
  ...vitestConfig,
});
