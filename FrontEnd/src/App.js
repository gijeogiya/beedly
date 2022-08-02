import './App.css'
import {LogoHeader, NavBar, Footer} from "./components/Common"
import { CategoryBar } from './pages/Main';
import { BrowserRouter,Route, Link} from "react-router-dom";
function App() {
  
  return (
    <div className="App">
      
      <LogoHeader/>
      <div className="main-content">
        <CategoryBar/>
      </div>
      <Footer />
      
      <NavBar />
      
    </div>
  );
}

export default App;
