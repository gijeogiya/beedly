import "./App.css";
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
import { SpecialAuction } from "./pages/SpecialAuction";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/Main";
import { ProductRegister } from "./pages/ProductRegister";
import { SpecialProductRegister } from "./pages/SpecialProductRegister";
import { ProductDeatail } from "./pages/ProductDeatail";
import { Temp } from "./pages/Temp";
import SaleList from "./pages/SaleList";
import MypageDetail from "./pages/MypageDetail";
import UpdateMyPage from "./pages/UpdateMypage.jsx";
import SignupTag from "./pages/SignupTag";

import { PurchaseSuccess } from "./pages/PurchaseSuccess";
import SearchResult from "./pages/SearchResult";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PurchaseDetail } from "./pages/PurchaseDetail";

import UpdateTag from "./pages/UpdateTag";

import SignupAritst from "./pages/SignupArtist";
import AdminUserManage from "./pages/AdminUserManage";

const Layout = () => {
  // const navigate = useNavigate();
  // const User = useSelector((state) => state.user.user.user);
  // useEffect(() => {
  //   if (User === "") {
  //     navigate("/login");
  //   }
  // });

  return (
    <div>
      <LogoHeader />
      <Outlet />
      <Footer />
      <NavBar />
    </div>
  );
};

const Layout2 = () => {
  return (
    <div>
      <LogoHeader />
      <Outlet />
      <NavBar />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productRegister" element={<ProductRegister />} />
          <Route path="/productModify" element={<ProductRegister />} />
          <Route path="/onair" element={<Onair />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup1" element={<SignupChoice />} />
          <Route path="/signup2" element={<Signup />} />
          <Route path="/specialAuction" element={<SpecialAuction />} />
          <Route path="/specialProduct" element={<SpecialProductRegister />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route
            path="/productDetail/:productId"
            element={<ProductDeatail />}
          />
          <Route path="/PurchaseDetail" element={<PurchaseDetail />} />
          <Route path="/saleList" element={<SaleList />} />
          <Route path="/mypageDetail" element={<MypageDetail />} />
          <Route path="/updateMypage" element={<UpdateMyPage />} />
          <Route path="/signupTag" element={<SignupTag />} />

          <Route path="/searchResult" element={<SearchResult />} />

          <Route path="/updateTag" element={<UpdateTag />} />
          <Route path="/signupArtist" element={<SignupAritst />} />
          <Route path="/adminUserManage" element={<AdminUserManage />} />

          <Route path="/purchase" element={<PurchaseSuccess />} />
        </Route>
        <Route path="/personalAuction" element={<Auction />} />
        <Route path="/auctionSeller" element={<Auction grade="seller" />} />
        <Route path="/auctionBuyer" element={<Auction grade="buyer" />} />
        <Route path="/user/kakao/callback" element={<Kakao />}></Route>
      </Routes>
    </div>
  );
}

export default App;
