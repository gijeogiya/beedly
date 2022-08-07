import axios from "axios";

const API_SERVER = "http://i7a601.p.ssafy.io:8080/api/";

const API_SERVER_SPECIAL = API_SERVER + "admin/special/";
const API_SERVER_PERSONAL = API_SERVER + "personalProduct/";
const specialPostApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY1OTY4NTE5MSwiZXhwIjoxNjU5NzcxNTkxfQ.9mIibcLf1pe4z_wBwOBzDzyX6tHZ6t6sTaeKCwZE9CY",
  },
});

const specialGetApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY1OTY4NTE5MSwiZXhwIjoxNjU5NzcxNTkxfQ.9mIibcLf1pe4z_wBwOBzDzyX6tHZ6t6sTaeKCwZE9CY",
  },
});

const personalPostApi = axios.create({
  baseURL: API_SERVER_PERSONAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY1OTY4NTE5MSwiZXhwIjoxNjU5NzcxNTkxfQ.9mIibcLf1pe4z_wBwOBzDzyX6tHZ6t6sTaeKCwZE9CY",
  },
});

const personalGetApi = axios.create({
  baseURL: API_SERVER_PERSONAL,
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY1OTY4NTE5MSwiZXhwIjoxNjU5NzcxNTkxfQ.9mIibcLf1pe4z_wBwOBzDzyX6tHZ6t6sTaeKCwZE9CY",
  },
});

const registerSpecialBoard = (formData, success, fail) => {
  specialPostApi.post(`/board`, formData).then(success).catch(fail);
};

const getData = (params, success, fail) => {
  specialGetApi.get(`/URL`, { params: params }).then(success).catch(fail);
};

const registerPersonalProduct = (formData, success, fail) => {
  personalPostApi.post(`/`, formData).then(success).then(fail);
};

const getPersonalProduct = (id, success, fail) => {
  personalGetApi.get(`/${id}`).then(success).then(fail);
};

export { registerSpecialBoard, registerPersonalProduct, getPersonalProduct };
