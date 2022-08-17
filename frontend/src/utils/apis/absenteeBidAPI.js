import { API_SERVER, axios } from "../api";
const API_SERVER_ABSENTEEBID = API_SERVER + "absenteeBid/";

const absenteeBidApi = axios.create({
  baseURL: API_SERVER_ABSENTEEBID,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const postAbsenteeBid = async (params, success, fail) => {
  await absenteeBidApi
    .post(`/product/${params.productId}`, {
      absenteeBidPrice: params.absenteeBidPrice,
    })
    .then(success)
    .catch(fail);
};

const updateAbsenteeBid = async (params, success, fail) => {
  await absenteeBidApi
    .patch(`${params.absenteeBidId}`, {
      absenteeBidPrice: params.absenteeBidPrice,
    })
    .then(success)
    .catch(fail);
};

const deleteAbsenteeBid = async (params, success, fail) => {
  await absenteeBidApi
    .delete(`${params.absenteeBidId}`)
    .then(success)
    .catch(fail);
};

export { postAbsenteeBid, updateAbsenteeBid, deleteAbsenteeBid };
