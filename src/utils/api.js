import axios from "axios";

// Create an axios instance with default settings
const api = axios.create({
  //baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
  // baseURL: "http://3.25.70.122:8000/api",

  baseURL: "http://3.25.70.122:8000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add authorization header if token is available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust according to your storage mechanism
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Function to handle responses
const handleResponse = (response) => response.data;

// Function to handle errors
const handleError = (error) => {
  // Handle errors here, e.g., log out user if unauthorized
  if (error.response && error.response.status === 401) {
    // Handle unauthorized access (e.g., redirect to login page)
  }
  return Promise.reject(error);
};

// API call functions
export const get = (url, config = {}) =>
  api.get(url, config).then(handleResponse).catch(handleError);
export const post = (url, data, config = {}) =>
  api.post(url, data, config).then(handleResponse).catch(handleError);
export const put = (url, data, config = {}) =>
  api.put(url, data, config).then(handleResponse).catch(handleError);
export const del = (url, config = {}) =>
  api.delete(url, config).then(handleResponse).catch(handleError);

export default api;
