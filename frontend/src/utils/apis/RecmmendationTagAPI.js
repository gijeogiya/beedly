import { API_SERVER, axios } from "../api";

const API_SERVER_RECOMMENDATIONTAG = API_SERVER + "recommendationtag/";

const instance = axios.create({
  baseURL: API_SERVER_RECOMMENDATIONTAG,
  headers: {
    contentType: "application/json",
  },
});

//태그 목록 조회
const getTagListApi = async (success, fail) => {
  await instance.get(``).then(success).catch(fail);
};

export { getTagListApi };
