import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut, userHistoryRetrieved } from "./../reducer";
import axios from "axios";

let globalVariables = require("./../globalVariables");

function Sidebar() {
  const [homeActive, setHomeActive] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const currentLoggedUser = useSelector((state) => state.userLogStatus);
  const dispatch = useDispatch();

  function onHomeClick() {
    setHomeActive(true);
    setProfileActive(false);
  }

  function onProfileClick() {
    setHomeActive(false);
    setProfileActive(true);
    if (currentLoggedUser !== "") {
      var userData = {
        username: currentLoggedUser.currentUser,
      };
      axios({
        url: "https://twitter-analysis-backend.herokuapp.com/getHistory",
        method: "POST",
        data: userData,
      })
        .then((res) => {
          console.log(res.data);
          dispatch(userHistoryRetrieved(res.data));
        })
        .catch((err) => {
          dispatch(
            userHistoryRetrieved([
              { twitUsername: "No History", personality: "" },
            ])
          );
        });
    }
  }

  function onLogOutClick() {
    var logButton = document.getElementsByClassName("login-button");
    var signButtom = document.getElementsByClassName("signup-button");
    var logUser = document.getElementsByClassName("logged-user");

    logButton[0].style.display = "inline-block";
    signButtom[0].style.display = "inline-block";
    logUser[0].style.display = "none";
    globalVariables.currentUser = "";
    dispatch(userLoggedOut());
  }

  return (
    <div className="sidebar-base">
      <Link
        to="/"
        className="sidebar-link home-link"
        data-testid="homeButton"
        onClick={onHomeClick}
      >
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
        data-testid="profileButton"
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
      <div
        className="sidebar-content log-out-div"
        data-testid="logoutButton"
        onClick={onLogOutClick}
      >
        <i className="bx bx-log-out"></i>
        <span className="log-out-sidebar-label sidebar-text">Log out</span>
      </div>
    </div>
  );
}

export default Sidebar;
