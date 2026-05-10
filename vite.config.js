import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild, mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [tailwindcss(), react()],
    server: {
      // Proxy /api to the direct Netlify Functions path to avoid a
      // Netlify Dev -> Vite -> Netlify Dev /api loop in local development.
      // Run: netlify dev --framework=#custom --targetPort 5173
      // Or simply: netlify dev  (which starts Vite internally on a different port)
      proxy: {
        '/api': {
          target: `http://localhost:${env.NETLIFY_DEV_PORT || 8888}`,
          rewrite: (path) => path.replace(/^\/api/, '/.netlify/functions'),
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.js'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: isSsrBuild ? undefined : {
            'vendor-react': ['react', 'react-dom'],
            'vendor-flow': ['@xyflow/react'],
            'vendor-chess': ['chess.js', 'react-chessboard'],
            'vendor-i18n': ['i18next', 'react-i18next'],
            'vendor-radix': ['@radix-ui/react-dialog', '@radix-ui/react-tooltip'],
          },
        },
      },
    },
  }
})
