import { API_SERVER, axios } from "../api";

const API_SERVER_TAG = API_SERVER + "searchtag/";

const tagApi = axios.create({
  baseURL: API_SERVER_TAG,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const getSearchTag = async (success, fail) => {
  await tagApi.get(`/`).then(success).catch(fail);
};

export { getSearchTag };
