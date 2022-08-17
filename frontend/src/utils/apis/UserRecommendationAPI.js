import { API_SERVER, axios } from "../api";

const API_SERVER_USER_RECOMMENDATION = API_SERVER + `userRecommendation/`;

const instance = axios.create({
  baseURL: API_SERVER_USER_RECOMMENDATION,
  headers: {
    contentType: "application/json",
  },
});

const authInstance = axios.create({
  baseURL: API_SERVER_USER_RECOMMENDATION,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

//유저 태그 등록
const registerTagApi = async (selectedTag, success, fail) => {
  await authInstance.post(``, { tags: selectedTag }).catch(fail).then(success);
};

// 유저를 위한 맞춤추천 상품 조회
const getRecommendationProductApi = async (success, fail) => {
  await authInstance.get(`list`).then(success).catch(fail);
};

export { registerTagApi, getRecommendationProductApi };
