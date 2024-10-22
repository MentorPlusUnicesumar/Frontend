import axios from "axios";

const baseURL = "http://10.7.13.43:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
