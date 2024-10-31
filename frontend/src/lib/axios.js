import axios from "axios";
import {BACKEND_API_URL} from "@/config.js";

export const api = axios.create({
  baseURL: BACKEND_API_URL,
})
