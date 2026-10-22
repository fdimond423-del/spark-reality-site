import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/spark-reality-site/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
});
