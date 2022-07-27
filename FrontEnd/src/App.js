import './App.css';
import {LogoHeader, NavBar, Footer} from "./components/Common"
import { BrowserRouter,Route, Link} from "react-router-dom";
function App() {
  
  return (
    <div className="App">
      
      <LogoHeader/>
      <div className="main-content"></div>
      <Footer />
      
      <NavBar />
      
    </div>
  );
}

export default App;
