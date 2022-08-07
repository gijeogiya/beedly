import axios from "axios";

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
  await instance.post(`/user/login?code=${code}`).then(success).catch(fail);
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
};
