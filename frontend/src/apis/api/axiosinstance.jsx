import axios from "axios";
import { toast } from "react-toastify";
import authInstance from "./interceptor";
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

// Reissue 함수를 호출하려는 경우
const axiosRefreshApi = (url, token, options) => {
  console.log("확인", token);
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
// export const authInstance = axiosAuthApi(BASE_URL)

/////////////////////////////////////////////////////////////

// 로그아웃
export const logout = async () => {
  try {
    const token = localStorage.getItem("Authorization");
    const authInstance = axiosAuthApi(BASE_URL, token);
    await authInstance.get("/users/logout");
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

// 유저 정보 가져오기
export const getUserInfo = async (id) => {
  try {
    const response = await authInstance.get("/mypage/userinfo", {
      params: { id },
    });
    return response.data.content;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await authInstance.get("/users/reissue", {
            headers: {
              Authorization: refreshToken,
            },
          });
          const { accessToken } = response.data.data;
          localStorage.setItem("Authorization", accessToken);
          return await getUserInfo(id);
        } catch (err) {
          console.error("토큰 재발급 요청 실패");
          localStorage.clear();
          window.location.replace("/auth");
          throw err;
        }
      } else {
        console.error("refresh_token을 찾을 수 없습니다.");
        throw error;
      }
    } else {
      console.error(error);
      throw error;
    }
  }
};

// 모든 검색 기사 가져오기
export const getAllKeywordNews = async (keyword) => {
  try {
    const response = await defaultInstance.get("/api/v1/news/search", {
      params: {
        searchword: keyword,
        pageNo: 0,
        pageSize: 999999,
      },
    });
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 검색 기사 가져오기
export const getKeywordNews = async (keyword, page) => {
  try {
    const response = await defaultInstance.get("/api/v1/news/search", {
      params: {
        searchword: keyword,
        pageNo: page,
        pageSize: 10,
      },
    });
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 언론사 데이터 가져오기
export const getPressData = async () => {
  try {
    const response = await defaultInstance.get("/press");
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 기자 데이터 가져오기
export const getReporterData = async (num) => {
  try {
    const response = await defaultInstance.get("/reporter/press", {
      params: { pressId: num },
    });
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 기자별 기사 데이터 가져오기
export const getReporterNews = async (name, page, pageSize) => {
  try {
    const res = await defaultInstance.get("/reporter/news", {
      params: {
        reporter: name,
        pageNo: page,
        pageSize: pageSize,
      },
    });
    return res.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 다음은 사용법

// import { defaultInstance, authInstance } from '@apis/utils'

// // 인증이 필요없는 데이터 요청
// export const getPost = async (data) => {
//   try {
//     const { data } = await defaultInstance.get(
//       `posts/channel/${data}`,
//     )
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }
// // 인증이 필요한 데이터 요청
// export const postCreate = async (data) => {
//   try {
//     await authInstance.post('posts/create', data)
//   } catch (error) {
//     console.log(error)
//   }
// }
