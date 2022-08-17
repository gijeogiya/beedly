import { API_SERVER, axios } from "../api";

const API_SERVER_PERSONAL = API_SERVER + "personalProduct/";

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
const instance = axios.create({
  baseURL: "https://i7a601.p.ssafy.io/api/",
  headers: {
    contentType: "application/json",
  },
});

const registerPersonalProduct = (formData, success, fail) => {
  personalPostApi.post(`/`, formData).then(success).catch(fail);
};

const updatePersonalProduct = (productId, formData, success, fail) => {
  personalPostApi.patch(`/${productId}`, formData).then(success).catch(fail);
};

const getPersonalProduct = async (productId, success, fail) => {
  await personalGetApi.get(`/${productId}`).then(success).catch(fail);
};

const getTempProductList = async (params, success, fail) => {
  await personalGetApi.get(`/list`, { params }).then(success).catch(fail);
};

const deletePersonalProduct = async (productId, success, fail) => {
  await personalGetApi.delete(`${productId}`).then(success).catch(fail);
};

const getOnairApi = async (page, size, sort, success, fail) => {
  await instance
    .get(`personalProduct/list/onAir?page=${page}&size=${size}&sort=${sort}`)
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

//카테고리로 Onair 상품 리스트 검색
const getOnairByCategoryApi = async (
  categoryName,
  page,
  size,
  sort,
  success,
  fail
) => {
  await instance
    .get(
      `personalProduct/list/onAirByCategory?categoryName=${categoryName}&page=${page}&size=${size}&sort=${sort}`
    )
    .then(success)
    .catch(fail);
};

//카테고리로 일반 상품 리스트 검색
const getProductByCategoryApi = async (
  categoryName,
  page,
  size,
  sort,
  success,
  fail
) => {
  await instance
    .get(
      `personalProduct/list?categoryName=${categoryName}&page=${page}&size=${size}&sort=${sort}`
    )
    .then(success)
    .catch(fail);
};

export {
  registerPersonalProduct,
  getPersonalProduct,
  getTempProductList,
  deletePersonalProduct,
  updatePersonalProduct,
  getProductListBySizeApi,
  getPersonalProductListApi,
  getOnairApi,
  getProductByCategoryApi,
  getOnairByCategoryApi,
};
