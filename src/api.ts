import axios from "axios";

export const baseURL = "https://mentorplus.dev.br/api/";
// export const baseURL = "http://10.10.17.7:3000/api/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
