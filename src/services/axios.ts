// axiosInstance.js or api.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

import { getCookie } from "@/utils/getCookie";
import useRoutes from "../hooks/routes";

const routes = useRoutes();
const url = routes.URLs.REFRESH_URL();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 600000,
});
axiosInstance.interceptors.request.use(
  async (config) => {
    // You can modify the request here, for example, add authorization tokens
    let accessToken = getCookie("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      const user = jwtDecode(accessToken);
      const isExpired = dayjs.unix(user.exp ?? 0).diff(dayjs()) < 1;
      if (!isExpired) return config;

      const response = await axios.post(url, {}, { withCredentials: true });
      if (response.status === 200) {
        accessToken = response.data.access_token;
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
    }

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
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status) {
      switch (status) {
        case 401:
          config._retry = true;
          try {
            const response = await axios.post(
              url,
              {},
              { withCredentials: true }
            );
            if (response.status === 200) {
              let accessToken = response.data.access_token;
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${accessToken}`;
              config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return axiosInstance(config); // Retry the original request with the new access token.
          } catch (refreshError) {
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        case 404:
          console.log("Resource not found");
          break;
        case 500:
          console.log("Server error");
          break;
        default:
          console.log("An error occurred");
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
