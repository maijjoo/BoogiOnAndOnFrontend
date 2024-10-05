import axios from 'axios';

// 백엔드 에서 ssl 설정을 해서 아래와 같이 설정
// 현재 vite.config.js 에서 proxy로 전역 설정 되어 있어서 url 쓸때 아래 부분은 생략해도 됨
export const API_SERVER_HOST = "https://localhost:8443";

const api = axios.create({
  baseURL: '/api', // Vite 프록시 설정과 일치
});

export default api;
