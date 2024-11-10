import axios from "axios";
//
// Create an Axios instance
const api = axios.create({
  // baseURL: "https://invoice-backend-ocfk.onrender.com/api",
  baseURL: "http://localhost:5000/api",

  maxContentLength: Infinity, // Remove content length limit
  maxBodyLength: Infinity, // Remove body length limit
});

// Request Interceptor to add the access token to each request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Attach the token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error response is 401 (Unauthorized) and we haven't tried refreshing yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try refreshing the access token using the refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          // "https://invoice-backend-ocfk.onrender.com/api/auth/refresh-token",
          "http://localhost:5000/api/auth/refresh-token",
          {
            refreshToken,
          }
        );

        // Save the new access token in local storage
        localStorage.setItem("accessToken", response.data.accessToken);

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out or redirect to login page
        console.log("Refresh token expired. Logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
