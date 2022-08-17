import { API_SERVER, axios } from "../api";

const API_SERVER_USER = API_SERVER + "user/";

const instance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    contentType: "application/json",
  },
});

const authInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

const getPurchaseProduct = async (params, success, fail) => {
  await authInstance
    .get(`/purchase/${params.productSoldId}`, {
      params: { auctionType: params.auctionType },
    })
    .then(success)
    .catch(fail);
};

const getPurchaseList = async (success, fail) => {
  await authInstance.get(`/purchase`).then(success).catch(fail);
};

const getSaleList = async (success, fail) => {
  await authInstance.get(`/sale`).then(success).catch(fail);
};

const getMyArtistList = async (success, fail) => {
  await authInstance.get(`/myartist`).then(success).catch(fail);
};

// login
const loginApi = async (code, success, fail) => {
  await instance.post(`/login?code=${code}`).then(success).catch(fail);
};

// login
const loginDevApi = async (code, success, fail) => {
  await instance.post(`/login/develop?code=${code}`).then(success).catch(fail);
};

// 닉네임 중복검사
const checkNicknameApi = async (nickname, success, fail) => {
  await instance.get(`/check?nickname=${nickname}`).then(success).catch(fail);
};

// user 정보 조회
const getUserInfoApi = async (success, fail) => {
  await authInstance.get(``).then(success).catch(fail);
};

// 회원 가입 (회원정보 수정)
const updateUserInfoApi = async (user, success, fail) => {
  await authInstance.patch(`/info`, user).then(success).catch(fail);
};

//내 구매내역 조회
const getPurchaseApi = async (success, fail) => {
  await authInstance.get(`/purchase`).then(success).catch(fail);
};

//관심 작품 조회
const getLikeProduct = async (success, fail) => {
  await authInstance.get(`/myfavorite`).then(success).catch(fail);
};

//관심 작가 조회
const getLikeArtist = async (success, fail) => {
  await authInstance.get(`/myartist`).then(success).catch(fail);
};
//판매내역 상세조회
const getSaleApi = async (success, fail) => {
  await authInstance.get(`/sale`).then(success).catch(fail);
};

export {
  getPurchaseProduct,
  getPurchaseList,
  getSaleList,
  getMyArtistList,
  loginApi,
  checkNicknameApi,
  getUserInfoApi,
  updateUserInfoApi,
  getPurchaseApi,
  getLikeProduct,
  getLikeArtist,
  getSaleApi,
  loginDevApi,
};
