import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [homeActive, setHomeActive] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const [historyActive, setHistoryActive] = useState(false);

  function onHomeClick() {
    setHomeActive(true);
    setProfileActive(false);
    setHistoryActive(false);
  }

  function onProfileClick() {
    setHomeActive(false);
    setProfileActive(true);
    setHistoryActive(false);
  }

  function onHistoryClick() {
    setHomeActive(false);
    setProfileActive(false);
    setHistoryActive(true);
  }

  function onLogOutClick() {
    var logButton = document.getElementsByClassName("login-button");
    var signButtom = document.getElementsByClassName("signup-button");
    var logUser = document.getElementsByClassName("logged-user");

    logButton[0].style.display = "inline-block";
    signButtom[0].style.display = "inline-block";
    logUser[0].style.display = "none";
  }

  return (
    <div className="sidebar-base">
      <Link to="/" className="sidebar-link home-link" onClick={onHomeClick}>
        <div
          className={
            homeActive
              ? "active-sidebar sidebar-content home-div"
              : "sidebar-content home-div"
          }
        >
          <i className="bx bx-home-alt "></i>
          <span className="home-sidebar-label sidebar-text">Home</span>
        </div>
      </Link>
      <Link
        to="/profile"
        className="sidebar-link profile-link"
        onClick={onProfileClick}
      >
        <div
          className={
            profileActive
              ? "active-sidebar sidebar-content profile-div"
              : "sidebar-content profile-div"
          }
        >
          <i className="bx bx-user"></i>
          <span className="profile-sidebar-label sidebar-text">Profile</span>
        </div>
      </Link>
      <Link
        to="/history"
        className="sidebar-link history-link"
        onClick={onHistoryClick}
      >
        <div
          className={
            historyActive
              ? "active-sidebar sidebar-content history-div"
              : "sidebar-content history-div"
          }
        >
          <i className="bx bx-history"></i>
          <span className="history-sidebar-label sidebar-text">History</span>
        </div>
      </Link>
      <div className="sidebar-content log-out-div" onClick={onLogOutClick}>
        <i className="bx bx-log-out"></i>
        <span className="log-out-sidebar-label sidebar-text">Log out</span>
      </div>
    </div>
  );
}

export default Sidebar;
