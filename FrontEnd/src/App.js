import "./App.css";
import { LogoHeader, Footer, NavBar } from "./components/Common";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import ProductList from "./pages/ProductList";
import Onair from "./pages/Onair";
import Login from "./pages/Login";
import SignupChoice from "./pages/SignupChoice";
import Signup from "./pages/Signup";
import Kakao from "./pages/Kakao";
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
      <Router>
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
            <Route path="/user/kakao/callback" element={<Kakao/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
