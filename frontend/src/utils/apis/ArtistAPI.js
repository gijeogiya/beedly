import { axios } from "../api";

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
const fileInstance = axios.create({
  baseURL: "https://i7a601.p.ssafy.io/api/",
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("token"),
    "Content-type": "multipart/form-data",
  },
});

// 작가 상세 조회
const artistDetailApi = async (artistId, success, fail) => {
  await authInstance.get(`/artist/${artistId}`).then(success).catch(fail);
};
// 작가 목록 가져오기
const getArtistApi = async (page, size, sort, success, fail) => {
  await instance
    .get(`artist?page=${page}&size=${size}&sort=${sort}`)
    .then(success)
    .catch(fail);
};

//작가찜하기
const addFavoriteArtistApi = async (artistId, success, fail) => {
  await authInstance
    .post(`artist/favorite/artist/${artistId}`)
    .then(success)
    .catch(fail);
};

//작가찜취소하기
const deleteFavoriteArtistApi = async (favoriteId, success, fail) => {
  await authInstance
    .delete(`artist/favorite/${favoriteId}`)
    .then(success)
    .catch(fail);
};
// 프로필 이미지 수정하기
const UpdateProfileImgApi = async (image, success, fail) => {
  await fileInstance
    .patch(`artist/info/profile`, image)
    .then(success)
    .catch(fail);
};

// 배경 이미지 수정하기
const UpdateBgImgApi = async (image, success, fail) => {
  await fileInstance
    .patch(`artist/info/background`, image)
    .then(success)
    .catch(fail);
};

// 작가 설명 수정하기
const UpdateDescApi = async (Desc, success, fail) => {
  await authInstance.patch(`artist/info/desc`, Desc).then(success).catch(fail);
};

// 작가의 종료된 상품 목록 보기
const getStandByProductByArtist = async (artistId, success, fail) => {
  await authInstance
    .get(`artist/product/standBy/${artistId}`)
    .then(success)
    .catch(fail);
};
// 작가의 진행중인 상품 목록 보기
const getSuccessProductByArtist = async (artistId, success, fail) => {
  await authInstance
    .get(`artist/product/success/${artistId}`)
    .then(success)
    .catch(fail);
};

export {
  artistDetailApi,
  getArtistApi,
  addFavoriteArtistApi,
  deleteFavoriteArtistApi,
  UpdateProfileImgApi,
  UpdateBgImgApi,
  UpdateDescApi,
  getStandByProductByArtist,
  getSuccessProductByArtist,
};
