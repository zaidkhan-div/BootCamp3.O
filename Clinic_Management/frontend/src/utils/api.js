import axios from "axios";
import axiosRetry from "axios-retry";
import { toast } from "react-toastify";

// --- Axios Instance ---
const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --- Token Handling ---
const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const removeToken = () => localStorage.removeItem("token");

// --- Retry Logic (for network/server errors) ---
axiosRetry(api, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkError(error) || error.response?.status >= 500,
});

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      removeToken();
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    } else if (status === 403) {
      toast.warning("You don’t have permission for this action.");
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (status === 404) {
      toast.error("Requested resource not found.");
    }

    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error.response || error.message);
    }

    return Promise.reject(error);
  }
);

// --- Simple Cache System (for GET requests) ---
const cache = new Map();

// --- Universal API Caller ---
export const apiCall = async (method, url, data = {}, config = {}) => {
  const cacheKey = `${method}:${url}`;

  // Use cached GET response if available
  if (method === "GET" && cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await api({ method, url, data, ...config });

    // Cache GET responses (in-memory)
    if (method === "GET") cache.set(cacheKey, response);

    // Show success toast for POST/PUT/DELETE (optional)
    if (["POST", "PUT", "DELETE"].includes(method)) {
      toast.success("Request completed successfully!");
    }

    return response;
  } catch (error) {
    // Handle error toast globally
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
    } else if (error.response.data?.message) {
      toast.error(error.response.data.message);
    }

    throw error;
  }
};

// --- Expose helper functions ---
export const apiHelpers = { getToken, setToken, removeToken };
export default api;
