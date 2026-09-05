// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],

//   server: {
//     port: 5173,
//     proxy: {
//       "/auth": {
//         target: "http://127.0.0.1:8000",
//         changeOrigin: true,
//       },
//       "/resume": {
//         target: "http://127.0.0.1:8000",
//         changeOrigin: true,
//       },
//     },
//   },
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({

  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {

    port: 5173,

    proxy: {

      "/auth": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },

      "/resume": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },

      "/ats": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },

      "/skill-gap": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },

      "/job-description": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },

      "/dashboard": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },

      "/milestone4": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },

    },

  },

});