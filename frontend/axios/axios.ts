import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://nike-footshop.test/api", // Set your base URL here
  headers: {
    "Content-Type": "application/vnd.api+json", // Set default content type to JSON
    Accept: "application/vnd.api+json",
  },
  validateStatus: () => true,
});

export default axiosClient;
