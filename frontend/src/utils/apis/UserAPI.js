import { API_SERVER, axios } from "../api";

const API_SERVER_USER = API_SERVER + "user/";

const authInstance = axios.create({
  baseURL: API_SERVER_USER,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

const getPurchaseProduct = async (params, success, fail) => {
  await authInstance
    .get(`/purchase/${params.productSoldId}`, {
      params: { auctionType: params.auctionType },
    })
    .then(success)
    .catch(fail);
};

export { getPurchaseProduct };
