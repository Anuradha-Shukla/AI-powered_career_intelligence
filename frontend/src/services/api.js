import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    console.log("API REQUEST:", config.url);
    console.log("TOKEN EXISTS:", !!token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(

  (response) => {
    return response;
  },

  (error) => {

    console.error(
      "API ERROR:",
      error.response?.status,
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }

);

export default api;