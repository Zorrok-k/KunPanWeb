import axios from "axios";
import { ElMessage } from "element-plus";

// 创建 Axios 对象
const service = axios.create({
  baseURL: "http://127.0.0.1:8100/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 给请求头添加 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error("[request.ts] 请求发生错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 获取响应数据
    const res = response.data;

    // 处理业务错误
    if (res.code && res.code != 200) {
      ElMessage({
        message: res.message,
        type: "error",
        plain: true,
      });
      return Promise.reject(new Error(res.message));
    }
    return res.data;
  },
  (error) => {
    // 处理异常网络状态
    let errorMessage = "未知错误";

    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 400:
          errorMessage = "请求参数错误，请检查输入。";
          break;
        case 401:
          errorMessage = "您的登录已过期，请重新登录。";
          break;
        case 403:
          errorMessage = "您没有权限访问此资源。";
          break;
        case 404:
          errorMessage = "请求的资源不存在，请检查路径。";
          break;
        case 500:
          errorMessage = "服务器出现错误，请稍后再试。";
          break;
        case 502:
          errorMessage = "网关错误，请稍后再试。";
          break;
        case 503:
          errorMessage = "服务暂时不可用，请稍后再试。";
          break;
        default:
          errorMessage = `请求失败: 状态码 ${status}`;
          break;
      }
    } else if (error.request) {
      errorMessage = "网络连接异常，请检查网络连接。";
    } else {
      errorMessage = "请求异常，请重试。";
    }

    // 使用 Element Plus 的 ElMessage 提示错误
    ElMessage({
      message: errorMessage,
      type: "error",
      plain: true,
    });

    // 继续抛出错误，让调用方 catch 到
    return Promise.reject(error);
  }
);

export default service;
