import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://tastyhaat-server.vercel.app",
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
