import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

let refreshPromise: Promise<unknown> | null = null;

// Authomatic refresh of tokens when we get "401 Unauthorized" error
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      //If error is not "401 Unauthorized"
      error.response?.status !== 401 || 
      //If this request has already been retried
      originalRequest._retry || 
      //If it's is a refresh request itself
      originalRequest.url === "/auth/refresh"
    ) {
      throw error;
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      refreshPromise = api
        .post("/auth/refresh")
        .finally(() => {
          refreshPromise = null;
        });
    }

    // If there are many simultaneous requests, they are all waiting for one refresh
    await refreshPromise;

    return api(originalRequest);
  }
);