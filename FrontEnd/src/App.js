import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import Login from "./pages/login.jsx";

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Login />

      </Router>
    </div>
  );
}

export default App;
