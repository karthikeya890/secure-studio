import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { tokenRefresh } from './auth';
import useAuthStore from "../stores/auth"; // Import the auth store

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global variables to manage token refreshing
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the accessToken from the authStore
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      useAuthStore.getState().logout(); // Use the logout function from authStore
      window.location.href = '/auth';
      return Promise.reject(error);
    }

    if (error.response?.status === 403 && originalRequest) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
      }

      try {
        const newToken = await refreshPromise;
        originalRequest.headers!['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // Retry with new token
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        useAuthStore.getState().logout(); // Use the logout function from authStore
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);

// Function to handle token refresh globally
async function refreshAccessToken(): Promise<string> {
  try {
    const refreshToken = useAuthStore.getState().refreshToken; // Get refreshToken from authStore
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const { accessToken, refreshToken: newRefreshToken } = await tokenRefresh({ token: refreshToken });

    // Update tokens in the authStore
    useAuthStore.getState().setTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("Refresh token request failed", error);
    throw error;
  }
}

export default axiosInstance;