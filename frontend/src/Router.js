import React from "react";
import { LogoHeader, Footer, NavBar } from "./components/Common";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
// import Main from "./pages/Main";
import Search from "./pages/Search";
import ProductList from "./pages/ProductList";
import Onair from "./pages/Onair";
// import Login from "./pages/Login";
import SignupChoice from "./pages/SignupChoice";
import Signup from "./pages/Signup";
import Kakao from "./pages/Kakao";
import Login from "./pages/Login";
import { Auction } from "./pages/Auction";
import { SpecialAuctionRegister } from "./pages/SpecialAuctionRegister";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/Main";
import { ProductRegister } from "./pages/ProductRegister";
import { SpecialProductRegister } from "./pages/SpecialProductRegister";
import { ProductDetail } from "./pages/ProductDetail";
import { Temp } from "./pages/Temp";
import SaleList from "./pages/SaleList";
import MypageDetail from "./pages/MypageDetail";
import UpdateMyPage from "./pages/UpdateMypage.jsx";
import SignupTag from "./pages/SignupTag";
import { PurchaseList } from "./pages/PurchaseList";
import { PurchaseSuccess } from "./pages/PurchaseSuccess";
import SearchResult from "./pages/SearchResult";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PurchaseDetail } from "./pages/PurchaseDetail";
import LikeArtist from "./pages/LikeArtist";
import UpdateTag from "./pages/UpdateTag";
import ArtistDetail from "./pages/ArtistDetail";
import SignupAritst from "./pages/SignupArtist";
import AdminUserManage from "./pages/AdminUserManage";
import { SpecialAuctionDetail } from "./pages/SpecialAuctionDetail";
import { LikeList } from "./pages/LikeList";
import { LikeArtistList } from "./pages/LikeArtistList";
import { LikeProduct } from "./components/LikeProduct";
import { BannerEvent1 } from "./pages/BannerEvent1";
import { BannerEvent2 } from "./pages/BannerEvent2";
import { KakaoPayRedirect } from "./pages/KakaoPayRedirect";

const Layout = () => {
  return (
    <div>
      <LogoHeader />
      <Outlet />
      <Footer />
      <NavBar />
    </div>
  );
};

const LayOutNoNav = () => {
  return (
    <div>
      <LogoHeader />
      <Outlet />
    </div>
  );
};

const LayoutNoFooter = () => {
  return (
    <div>
      <LogoHeader />
      <Outlet />
      <NavBar />
    </div>
  );
};

export const Router = () => {
  return (
    <Routes>
      {/* 로고, 푸터, 내브바 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
      {/* 로고, 내브바 */}
      <Route path="/" element={<LayoutNoFooter />}>
        <Route path="/search" element={<Search />} />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/onair" element={<Onair />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup1" element={<SignupChoice />} />
        <Route path="/signup2" element={<Signup />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productDetail/:productId" element={<ProductDetail />} />
        <Route path="/artistDetail/:artistId" element={<ArtistDetail />} />
        <Route path="/PurchaseDetail" element={<PurchaseDetail />} />
        <Route path="/PurchaseList" element={<PurchaseList />} />
        <Route path="/saleList" element={<SaleList />} />
        <Route path="/LikeList" element={<LikeList />} />
        <Route path="/likeArtist" element={<LikeArtist />} />
        <Route path="/likeProduct" element={<LikeProduct />} />
        <Route path="/LikeArtist" element={<LikeArtistList />} />
        <Route path="/mypageDetail" element={<MypageDetail />} />
        <Route path="/signupTag" element={<SignupTag />} />
        <Route
          path="/specialAuctionDetail/:boardId"
          element={<SpecialAuctionDetail />}
        />
        <Route path="/updateTag" element={<UpdateTag />} />
        <Route path="/signupArtist" element={<SignupAritst />} />
        <Route path="/adminUserManage" element={<AdminUserManage />} />
        <Route path="/purchase/:soldId" element={<PurchaseSuccess />} />
        <Route path="/purchaseDetail/:soldId" element={<PurchaseDetail />} />
        <Route path="/bannerEvent1" element={<BannerEvent1 />} />
        <Route path="/bannerEvent2" element={<BannerEvent2 />} />
      </Route>
      {/* 로고,  */}
      <Route path="/" element={<LayOutNoNav />}>
        <Route path="/productRegister" element={<ProductRegister />} />
        <Route path="/productModify" element={<ProductRegister />} />
        <Route
          path="/specialAuctionRegister"
          element={<SpecialAuctionRegister />}
        />
        <Route
          path="/specialBoardModify"
          element={<SpecialAuctionRegister />}
        />
        <Route
          path="/specialProduct/:boardId"
          element={<SpecialProductRegister />}
        />
        <Route path="/kakaopay/callback" element={<KakaoPayRedirect />}></Route>
      </Route>

      {/* 아무것도 없음 */}
      <Route path="/personalAuction" element={<Auction />} />
      <Route path="/specialAuction" element={<Auction />} />
      <Route path="/user/kakao/callback" element={<Kakao />}></Route>

      {/* 메인 배너 이벤트 페이지*/}
    </Routes>
  );
};
