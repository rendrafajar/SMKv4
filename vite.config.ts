import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
    // Exclude pg from optimization to prevent issues
    exclude: ["pg", "pg-native"],
  },
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add aliases for Node.js built-ins
      path: "path-browserify",
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      util: "util",
      buffer: "buffer",
      events: "events",
    },
  },
  define: {
    // Polyfill for pg library which expects Node.js process
    "process.env": {},
    "process.platform": JSON.stringify("browser"),
    "process.version": JSON.stringify("v16.0.0"),
    global: "globalThis",
    process: {
      env: {},
      nextTick: (cb) => setTimeout(cb, 0),
      browser: true,
    },
  },
  build: {
    rollupOptions: {
      // Externalize pg to prevent bundling issues
      external: ["pg", "pg-native"],
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
    hmr: {
      // Reduce socket timeout to prevent hanging connections
      timeout: 5000,
      // Properly close connections on error
      clientPort: null,
    },
  },
});
