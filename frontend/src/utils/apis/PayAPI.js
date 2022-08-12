import { API_SERVER, axios } from "../api";

const API_SERVER_PAY = API_SERVER + "pay/";

const payApi = axios.create({
  baseURL: API_SERVER_PAY,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const postPersonalPay = async (soldId, success, fail) => {
  await payApi.post(`/personal/sold/${soldId}`).then(success).catch(fail);
};

const postSpecialPay = async (soldId, success, fail) => {
  await payApi.post(`/special/sold/${soldId}`).then(success).catch(fail);
};
