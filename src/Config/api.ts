import axios from "axios"
const api = axios.create({
  baseURL: "http://195.191.45.56:17017",
    // baseURL: "http://195.191.45.56:18017",
  // baseURL:'/'
});

export default api;
