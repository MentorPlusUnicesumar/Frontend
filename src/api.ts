import axios from "axios";

const baseURL = "http://localhost:3030";

const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default api;