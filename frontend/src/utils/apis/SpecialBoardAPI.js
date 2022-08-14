import { API_SERVER, axios } from "../api";

const API_SERVER_SPECIAL = API_SERVER + "admin/special/";

const specialPostApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const specialProductPostApi = axios.create({
  baseURL: API_SERVER_SPECIAL + "product/board/",
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const speciaUpdateDeletelApi = axios.create({
  baseURL: API_SERVER_SPECIAL + "product/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const specialApi = axios.create({
  baseURL: API_SERVER + "special/board/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const specialDelPatchApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const registerSpecialBoard = (formData, success, fail) => {
  specialPostApi.post(`/board`, formData).then(success).catch(fail);
};

const getSpecialBoard = (boardId, success, fail) => {
  specialApi.get(`/${boardId}`).then(success).catch(fail);
};

const deleteSpecialBoard = async (boardId, success, fail) => {
  await specialDelPatchApi
    .delete(`/board/${boardId}`)
    .then(success)
    .catch(fail);
};

const updateSpecialBoard = async (boardId, formData, success, fail) => {
  await specialPostApi
    .patch(`/board/${boardId}`, formData)
    .then(success)
    .catch(fail);
};

const registerSpecialProduct = async (boardId, formData, success, fail) => {
  await specialProductPostApi
    .post(`/${boardId}`, formData)
    .then(success)
    .catch(fail);
};

const updateSpecialProduct = async (productId, formData, success, fail) => {
  await specialPostApi
    .patch(`/product/${productId}`, formData)
    .then(success)
    .catch(fail);
};

const deleteSpecialProduct = async (productId, success, fail) => {
  await speciaUpdateDeletelApi.delete(`${productId}`).then(success).catch(fail);
};

export {
  registerSpecialBoard,
  getSpecialBoard,
  deleteSpecialBoard,
  updateSpecialBoard,
  registerSpecialProduct,
  deleteSpecialProduct,
  updateSpecialProduct,
};
