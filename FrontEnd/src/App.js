import "./App.css";
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
    </div>
  );
}

export default App;
