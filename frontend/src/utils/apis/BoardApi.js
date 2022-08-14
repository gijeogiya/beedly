import { API_SERVER, axios } from "../api";

const boardApi = axios.create({
  baseURL: API_SERVER + "board/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const getBoard = async (boardType, success, fail) => {
  await boardApi.get(`/${boardType}`).then(success).catch(fail);
};

const deleteBoard = async (boardType, success, fail) => {
  await boardApi.delete(`/${boardType}`).then(success).catch(fail);
};

const postBoard = async (params, success, fail) => {
  await boardApi.post(`/`, { params: params }).then(success).catch(fail);
};

const updateBoard = async (params, success, fail) => {
  await boardApi.patch(`/`, { params: params }).then(success).catch(fail);
};

export { getBoard, deleteBoard, postBoard, updateBoard };
