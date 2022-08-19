import { API_SERVER, axios } from "../api";

const API_SERVER_ADMIN = API_SERVER + "admin/";

const instance = axios.create({
  baseURL: API_SERVER_ADMIN,
  headers: {
    contentType: "application/json",
  },
});

const authInstance = axios.create({
  baseURL: API_SERVER_ADMIN,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

// artist 신청서 받기
const artistApplicationApi = async (success, fail) => {
  await authInstance.get(`application`).then(success).catch(fail);
};

// 승인 안된 작가 리스트 조회
const applicationListApi = async (success, fail) => {
  await authInstance.get(`applicationList`).then(success).catch(fail);
};

// 작가 승인
const artistApproveApi = async (userId, success, fail) => {
  await authInstance.patch(`upgrade/${userId}`).then(success).catch(fail);
};
export { artistApplicationApi, applicationListApi, artistApproveApi };
