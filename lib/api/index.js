import axios from "axios";
import { getCookie } from "../utils/cookies"; // Your function to read cookies

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

// Interceptor to add token to all requests except login and register
api.interceptors.request.use((config) => {
  // List of endpoints where token should NOT be attached
  const excludedPaths = ['/login', '/register'];

  // If the request URL is one of the excluded paths, skip adding the token
  if (excludedPaths.includes(config.url)) {
    return config;
  }

  // Otherwise, attach the token if it exists
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
