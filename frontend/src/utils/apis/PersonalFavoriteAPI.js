import { API_SERVER, axios } from "../api";

const API_SERVER_FAVORITE = API_SERVER + "favorite/";

const personalFavoriteApi = axios.create({
  baseURL: API_SERVER_FAVORITE,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const postPersonalFavorite = async (productId, success, fail) => {
  await personalFavoriteApi
    .post(`/product/${productId}`)
    .then(success)
    .catch(fail);
};

const deletePersonalFavorite = async (favoriteId, success, fail) => {
  await personalFavoriteApi.delete(`/${favoriteId}`).then(success).catch(fail);
};

export { postPersonalFavorite, deletePersonalFavorite };
