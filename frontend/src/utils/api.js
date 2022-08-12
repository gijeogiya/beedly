import axios from "axios";

export const API_SERVER = "https://i7a601.p.ssafy.io/api/";

//토큰이 필요하지 않은 axios 처리
const instance = axios.create({
  baseURL: "https://i7a601.p.ssafy.io/api/",
  headers: {
    contentType: "application/json",
  },
});
// const BASEURL = "https://i7a601.p.ssafy.io/api/";
// export const Token = () => {
//   const Selector = useSelector((state) => state.user.user);
//   return localStorage.getItem("token");
// };
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

//판매내역 상세조회
const getSalelApi = async (success, fail) => {
  await authInstance.get(`/user/sale`).then(success).catch(fail);
};

//태그 목록 조회
const getTagListApi = async (success, fail) => {
  await instance.get(`/recommendationtag`).then(success).catch(fail);
};

//유저 태그 등록
const registerTagApi = async (selectedTag, success, fail) => {
  await authInstance
    .post(`/userRecommendation`, { tags: selectedTag })
    .then(success)
    .catch(fail);
};

// artist 신청서 받기
const artistApplicationApi = async (success, fail) => {
  await authInstance.get(`/admin/application`).then(success).catch(fail);
};

// 승인 안된 작가 리스트 조회
const applicationListApi = async (success, fail) => {
  await authInstance.get(`/admin/applicationList`).then(success).catch(fail);
};

// 작가 승인
const artistApproveApi = async (userId, success, fail) => {
  await authInstance
    .patch(`/admin/upgrade/${userId}`)
    .then(success)
    .catch(fail);
};

// Product API
// 유저를 위한 맞춤추천 상품 조회
const getRecommendationProductApi = async (success, fail) => {
  await authInstance.get(`/userRecommendation/list`).then(success).catch(fail);
};

// 생방송 중인 상품 목록 조회
const getOnairApi = async (page, size, sort, success, fail) => {
  await instance
    .get(`personalProduct/list/onAir?page=${page}&size=${size}&sort=${sort}`)
    .then(success)
    .catch(fail);
};

// 작가 목록 가져오기
const getArtistApi = async (page, size, sort, success, fail) => {
  await instance
    .get(`artist?page=${page}&size=${size}&sort=${sort}`)
    .then(success)
    .catch(fail);
};

// 상시 경매 작품 조회
const getPersonalProductListApi = async (page, size, sort, success, fail) => {
  await instance
    .get(`personalProduct?page=${page}&size=${size}&sort=${sort}`)
    .then(success)
    .catch(fail);
};

// 상품 사이즈카테고리로 작품 조회
const getProductListBySizeApi = async (
  productSize,
  page,
  size,
  sort,
  success,
  fail
) => {
  await instance
    .get(
      `personalProduct/sizeCategory/${productSize}?page=${page}&size=${size}&sort=${sort}`
    )
    .then(success)
    .catch(fail);
};
export {
  axios,
  loginApi,
  checkNicknameApi,
  getUserInfoApi,
  updateUserInfoApi,
  getPurchaseApi,
  getPurchaseDetailApi,
  getSalelApi,
  getTagListApi,
  registerTagApi,
  artistApplicationApi,
  applicationListApi,
  artistApproveApi,
  getOnairApi,
  getArtistApi,
  getRecommendationProductApi,
  getPersonalProductListApi,
  getProductListBySizeApi,
};
