import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "http://localhost:8002"
})

export default axiosConfig;