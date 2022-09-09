import axios from "axios";

const api = axios.create({
  baseURL: 'https://mid.multtv.tv.br/apps/login',
});

export default api;