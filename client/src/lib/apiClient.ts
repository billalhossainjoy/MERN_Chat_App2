import axios from "axios";

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_REST_API + "/api",
  withCredentials: true,
});
