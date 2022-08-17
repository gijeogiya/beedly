import { API_SERVER, axios } from "../api";

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

const getProductByArtistId = async (
  artistId,
  page,
  size,
  sort,
  success,
  fail
) => {
  await authInstance
    .get(
      `/search/artist?artistId=${artistId}&page=${page}&size=${size}&sort=${sort}`
    )
    .then(success)
    .catch(fail);
};
//작가 닉네임으로 상품 리스트 검색
const getProductByArtistNickNameApi = async (
  artistNickname,
  page,
  size,
  sort,
  success,
  fail
) => {
  await authInstance
    .get(
      `/search?userNickname=${artistNickname}&page=${page}&size=${size}&sort=${sort}`
    )
    .then(success)
    .catch(fail);
};

//
const getProductByProductNameApi = async (
  page,
  productName,
  size,
  sort,
  success,
  fail
) => {
  await authInstance
    .get(
      `/search/product?page=${page}&productName=${productName}&size=${size}&sort=${sort}`
    )
    .then(success)
    .catch(fail);
};

//태그명으로 상품 검색
const getProductByTagApi = async (page, size, sort, tag, success, fail) => {
  await authInstance
    .get(`/search/tag?page=${page}&size=${size}&sort=${sort}&tag=${tag}`)
    .then(success)
    .catch(fail);
};
export {
  getProductByArtistId,
  getProductByArtistNickNameApi,
  getProductByProductNameApi,
  getProductByTagApi,
};
