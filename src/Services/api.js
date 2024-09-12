import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
