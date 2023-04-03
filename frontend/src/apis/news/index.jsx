import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = "https://j8c206.p.ssafy.io/api/v1";

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);

// // 카테고리 데이터 가져오기
// export const getReporterData = async (category, page, pageSize) => {
//   try {
//     const response = await defaultInstance.get
//     ("/category/trend"`${process.env.REACT_APP_API_URL}/products/main?pageNo=${page}&pageSize=${pageSize}`
//       )
//     , {
//       params: {
//         category: category,
//         page: page,
//         pageSize: pageSize,
//       },
//     });
//     console.log(response)
//     return response.data.content;

//   } catch (error) {
//     console.log(error);
//   }
// };
