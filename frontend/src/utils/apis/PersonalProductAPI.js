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

export {
  registerPersonalProduct,
  getPersonalProduct,
  getTempProductList,
  deletePersonalProduct,
  updatePersonalProduct,
};
