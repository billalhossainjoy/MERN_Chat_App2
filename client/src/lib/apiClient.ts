import axios from "axios";

console.log(import.meta.env.VITE_REST_API);

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_REST_API + "/api",
  withCredentials: true,
});
