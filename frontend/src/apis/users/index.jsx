import axios from "axios";
import { toast } from "react-toastify";
import authInstance from "../api/interceptor";

// const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = "https://j8c206.p.ssafy.io/api/v1";

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

// Post, Put, Delete 등 요청으로 인증값이 필요한 경우
const axiosAuthApi = (url, token, options) => {
  // console.log("확인", token);
  console.log(options);
  const instance = axios.create({
    baseURL: url,
    headers: {
      Authorization: token,
    },
    ...options,
  });
  return instance;
};

// axios 인스턴스를 내보낸다.
export const defaultInstance = axiosApi(BASE_URL);

// 로그아웃
export const logout = async () => {
  try {
    const token = localStorage.getItem("Authorization");
    const authAxios = axiosAuthApi(BASE_URL, token);
    await authAxios.get("/users/logout");
    localStorage.removeItem("Authorization");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("userId");
    toast.success(<h3>로그아웃 성공👋</h3>, {
      position: "top-center",
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
  }
};

// 로그인
export const login = async (values) => {
  const { email, password } = values;

  const loginData = {
    email: email,
    password: password,
  };

  try {
    const response = await defaultInstance.post(`users/login`, loginData);
    localStorage.setItem("Authorization", response.headers.atk);
    localStorage.setItem("refresh-token", response.headers.rtk);
    localStorage.setItem("userId", response.data.content.userId);

    toast.success(<h3>로그인 성공😎</h3>, {
      position: "top-center",
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error(<h3>로그인정보를 확인해주세요😭</h3>, {
      position: "top-center",
      autoClose: 2000,
    });
  }
};
