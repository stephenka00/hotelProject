import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    port: 5173,
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
    strictPort: true, // Bắt buộc sử dụng port này
  },
});

