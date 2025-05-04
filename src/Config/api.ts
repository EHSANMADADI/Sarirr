import axios from "axios";

// ایجاد یک اینستنس از axios
const api = axios.create({
  baseURL: "http://109.230.90.198:18017", // آدرس API
  withCredentials: true,
});

// تابعی برای دریافت توکن جدید از طریق رفرش توکن
const refreshAccessToken = async () => {
  try {
    const response = await axios.post("https://192.168.4.85:3300/api/TokenQuery/Refresh", {}, { withCredentials: true });
    const newToken = response.data.accessToken;
    localStorage.setItem("accessToken", newToken);
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// اضافه کردن توکن به همه درخواست‌ها
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// هندل کردن ارور 401 و تلاش مجدد با توکن جدید
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // بررسی اگر 401 است و درخواست قبلاً ریفرش نشده است
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        axios.defaults.headers.common["Authorization"] = `${newToken}`;
        originalRequest.headers["Authorization"] = `${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // اگر رفرش توکن هم شکست خورد، کاربر را بیرون بینداز
        localStorage.removeItem("accessToken");
        window.location.href = "/s";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
