import axios from "axios";
import { env } from "@/config/env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// helper to safely access localStorage
const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
};

const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};

// request interceptor to attach the auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();

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
    // handle 401 on client-side
    // We don't globally redirect on 401 to allow public pages (e.g., products)
    // to be accessible even when unauthenticated. Components/pages should
    // handle auth-specific redirects themselves.
    if (typeof window !== "undefined" && error.response?.status === 401) {
      removeToken();
      // Intentionally avoid redirecting here. Let the calling code decide.
    }

    return Promise.reject(error);
  },
);
