import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8002",
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("tokennn..." , token)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosConfig;
