import axios from "axios";
import {BACKEND_API_URL} from "@/config.js";

export const api = axios.create({
  baseURL: BACKEND_API_URL,
});

api.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
})

api.interceptors.response.use((response) => {
    if (response.status === 401) {
      window.location.href = "/auth/login";
      return Promise.reject(new Error("Unauthorized"));
    }
    return response;
  }
)
