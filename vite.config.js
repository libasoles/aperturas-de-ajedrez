import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [tailwindcss(), react()],
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
}))
