import axios from "axios";

export const baseURL = "http://10.10.17.8:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
