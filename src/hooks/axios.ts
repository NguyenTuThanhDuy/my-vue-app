// axiosInstance.js or api.js
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request here, for example, add authorization tokens
    // const token = localStorage.getItem("authToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response, if needed
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized error
          console.log("Unauthorized, logging out...");
          localStorage.removeItem("authToken");
          window.location.href = "/";
          break;
        case 404:
          console.log("Resource not found");
          break;
        case 500:
          console.log("Server error");
          break;
        default:
          console.log("An error occurred");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
