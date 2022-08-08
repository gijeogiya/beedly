import axios from "axios";

const API_SERVER = "https://i7a601.p.ssafy.io/api/";

const API_SERVER_SPECIAL = API_SERVER + "admin/special/";
const API_SERVER_PERSONAL = API_SERVER + "personalProduct/";

const specialPostApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const specialGetApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const personalPostApi = axios.create({
  baseURL: API_SERVER_PERSONAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const personalGetApi = axios.create({
  baseURL: API_SERVER_PERSONAL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const registerSpecialBoard = (formData, success, fail) => {
  specialPostApi.post(`/board`, formData).then(success).catch(fail);
};

const getData = (params, success, fail) => {
  specialGetApi.get(`/URL`, { params: params }).then(success).catch(fail);
};

const registerPersonalProduct = (formData, success, fail) => {
  personalPostApi.post(`/`, formData).then(success).catch(fail);
};

const getPersonalProduct = async (id, success, fail) => {
  await personalGetApi.get(`/${id}`).then(success).catch(fail);
};

const getTempProductList = async (params, success, fail) => {
  await personalGetApi(`/list`, { params }).then(success).catch(fail);
};

//토큰이 필요하지 않은 axios 처리
const instance = axios.create({
  baseURL: "https://i7a601.p.ssafy.io/api/",
  headers: {
    contentType: "application/json",
  },
});
const BASEURL = "https://i7a601.p.ssafy.io/api/";
// token이 필요한 axios 처리
const authInstance = axios.create({
  baseURL: "https://i7a601.p.ssafy.io/api/",
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

// login
const loginApi = async (code, success, fail) => {
  await instance.post(`user/login?code=${code}`).then(success).catch(fail);
};

// 닉네임 중복검사
const checkNicknameApi = async (nickname, success, fail) => {
  await instance
    .get(`/user/check?nickname=${nickname}`)
    .then(success)
    .catch(fail);
};

// user 정보 조회
const getUserInfoApi = async (success, fail) => {
  await authInstance.get(`/user`).then(success).catch(fail);
};

// 회원 가입 (회원정보 수정)
const updateUserInfoApi = async (user, success, fail) => {
  await authInstance.patch(`/user/info`, user).then(success).catch(fail);
};

//내 구매내역 조회
const getPurchaseApi = async (success, fail) => {
  await authInstance.get(`/user/purchase`).then(success).catch(fail);
};

// 구매내역 상세 조회
const getPurchaseDetailApi = async (
  productSoldId,
  auctionType,
  success,
  fail
) => {
  await authInstance
    .get(`/user/purchase/${productSoldId}?auctionType = ${auctionType}`)
    .then(success)
    .catch(fail);
};

export {
  loginApi,
  checkNicknameApi,
  getUserInfoApi,
  updateUserInfoApi,
  getPurchaseApi,
  getPurchaseDetailApi,
  registerSpecialBoard,
  registerPersonalProduct,
  getPersonalProduct,
  getTempProductList,
};
