import { API_SERVER, axios } from "../api";

const API_SERVER_AUCTION = API_SERVER + "auction/";

const auctionApi = axios.create({
  baseURL: API_SERVER_AUCTION,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const specialAuctionFinishApi = axios.create({
  baseURL: API_SERVER + "special/successful/bid/product/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

const auctionFinishApi = axios.create({
  baseURL: API_SERVER + "personal/successful/bid/product/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("token"),
  },
});

// 상시 경매방 생성
const registerAuction = async (productId, success, fail) => {
  await auctionApi
    .post(`/personal/product/${productId}`)
    .then(success)
    .catch(fail);
};

//상시 경매방 입장
const getAuctionProduct = async (auctionId, success, fail) => {
  await auctionApi.get(`/${auctionId}/personal`).then(success).catch(fail);
};

//상시 경매 낙찰 확정
const postAuctionFinished = async (productId, success, fail) => {
  await auctionFinishApi.post(`${productId}`).then(success).catch(fail);
};

//상시 경매방 종료
const patchAuctionEnd = async (auctionId, success, fail) => {
  await auctionApi.patch(`${auctionId}/personal`).then(success).catch(fail);
};

// 기획전 경매방 생성
const registerSpecialAuction = async (boardId, success, fail) => {
  await auctionApi.post(`/special/board/${boardId}`).then(success).catch(fail);
};

// 기획전 경매방 입장
const getSpecialAuctionProduct = async (auctionId, success, fail) => {
  await auctionApi.get(`/${auctionId}/special`).then(success).catch(fail);
};

//기획전 경매 낙찰 확정
const postSpecialAuctionFinished = async (productId, success, fail) => {
  await specialAuctionFinishApi.post(`${productId}`).then(success).catch(fail);
};
// 기획전 경매방 종료
const patchSpecialAuctionEnd = async (auctionId, success, fail) => {
  await auctionApi.patch(`${auctionId}/special`).then(success).catch(fail);
};

export {
  registerAuction,
  getAuctionProduct,
  postAuctionFinished,
  patchAuctionEnd,
  postSpecialAuctionFinished,
  patchSpecialAuctionEnd,
  getSpecialAuctionProduct,
  registerSpecialAuction,
};
