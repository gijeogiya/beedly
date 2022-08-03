import "./App.css";
<<<<<<< HEAD
import { LogoHeader, Footer, NavBar } from "./components/Common";
import { Outlet, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import ProductList from "./pages/ProductList";
import Onair from "./pages/Onair";
import Login from "./pages/Login";
import SignupChoice from "./pages/SignupChoice";
import Signup from "./pages/Signup";
import Kakao from "./pages/Kakao";
=======
import { LogoHeader, NavBar, Footer } from "./components/Common";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import ProductListPage from "./pages/ProductListPage";
import OnairPage from "./pages/OnairPage";
import MyPage from "./pages/MyPage";
import { Auction } from "./pages/Auction";

>>>>>>> 4e2ee8a569ff63c74111edc7186ff6eac6e85ab4
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

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/onair" element={<Onair />} />
          <Route path="/mypage" element={<Login />} />
          <Route path="/signup1" element={<SignupChoice />} />
          <Route path="/signup2" element={<Signup />} />
        </Route>
        <Route path="/user/kakao/callback" element={<Kakao />}></Route>
      </Routes>
=======
      <Auction />
      {/* <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/productlist" element={<ProductListPage />} />
            <Route path="/onair" element={<OnairPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </Router> */}
>>>>>>> 4e2ee8a569ff63c74111edc7186ff6eac6e85ab4
    </div>
  );
}

export default App;
