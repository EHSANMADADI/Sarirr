import axios from "axios"
const api = axios.create({
  baseURL: "http://109.230.90.198:18017",
    // baseURL: "http://195.191.45.56:17017",
  // baseURL:'/'
});

export default api;
