import { API_SERVER, axios } from "../api";

const API_SERVER_SPECIAL = API_SERVER + "admin/special/";

const specialPostApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const specialApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const registerSpecialBoard = (formData, success, fail) => {
  specialPostApi.post(`/board`, formData).then(success).catch(fail);
};

const getData = (params, success, fail) => {
  specialApi.get(`/URL`, { params: params }).then(success).catch(fail);
};

export { registerSpecialBoard };
