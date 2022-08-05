import axios from "axios";

const API_SERVER = "http://i7a601.p.ssafy.io:8080/api/";

const API_SERVER_SPECIAL = "http://i7a601.p.ssafy.io:8080/api/admin/special/";

const specialApi = axios.create({
  baseURL: API_SERVER_SPECIAL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY1OTY4NTE5MSwiZXhwIjoxNjU5NzcxNTkxfQ.9mIibcLf1pe4z_wBwOBzDzyX6tHZ6t6sTaeKCwZE9CY",
  },
});

const registerSpecialBoard = (formData, success, fail) => {
  specialApi.post(`/board`, formData).then(success).catch(fail);
};

const getData = (params, success, fail) => {
  specialApi.get(`/URL`, { params: params }).then(success).catch(fail);
};

export { registerSpecialBoard };
