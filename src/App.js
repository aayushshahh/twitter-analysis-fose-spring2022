import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import History from "./Components/History";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <div>
      <Header />
      <Login />
      <Signup />
      <div className="main-content">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/history" exact element={<History />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
