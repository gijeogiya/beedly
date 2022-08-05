import './App.css'
import {LogoHeader, NavBar, Footer} from "./components/Common"
import { MainPage } from './pages/Main';
import { BrowserRouter, Route, Link} from "react-router-dom";
function App() {
  
  return (
    <div className="App">
      
      <LogoHeader />
      <MainPage />
      <Footer />
      <NavBar />
      
    </div>
  );
}

export default App;
