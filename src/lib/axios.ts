import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
