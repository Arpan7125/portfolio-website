import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative asset paths so the build works both at
  // arpan7125.github.io/portfolio-website/ and at a bare custom domain.
  base: './',
  plugins: [react(), tailwindcss()],
});
