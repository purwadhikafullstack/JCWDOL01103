import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:8000",
});
server.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
);
