import axios from "../config/axios";

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: "http://192.168.0.137:8080/api",
  timeout: 5000, // 超时时间 5s
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response.data;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

// 封装 GET 请求方法
export const get = (url, params) => {
  return instance.get(url, { params });
};

// 封装 POST 请求方法
export const post = (url, data) => {
  return instance.post(url, data);
};
