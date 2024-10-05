import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  // 외부 접속 허용(localhost 외의 접속도 허용)
  // dev 과정에서 폰으로도 접속하려면 필수 설정
  server: {
    host: true, // 또는 '0.0.0.0'
    https: true,
    port: 5173, // 원하는 포트 번호로 설정
    // ssl을 위한 설정 개발단계에서만 되고 배포할때는 안될 거라고 함
    proxy: {
      '/api': {
        target: 'https://localhost:8443', // 실제 API 서버 주소
        changeOrigin: true,
        secure: false, // 개발 환경에서 자체 서명 인증서 허용
        cors: true
      }
    }
  },
});
