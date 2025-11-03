import axios from "axios";
import { env } from "@/config/env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to attach the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle 401 unauthorized error
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");

      // redirect to login page
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);
