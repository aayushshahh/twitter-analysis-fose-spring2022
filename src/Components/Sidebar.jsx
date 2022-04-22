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
  const currentLoggedUser = useSelector(
    (state) => state.userLogStatus.currentUser
  );
  const dispatch = useDispatch();

  function onHomeClick() {
    setHomeActive(true);
    setProfileActive(false);
  }

  function onProfileClick() {
    setHomeActive(false);
    setProfileActive(true);
    console.log(currentLoggedUser);
    if (currentLoggedUser !== "") {
      var userData = {
        username: currentLoggedUser,
      };
      axios({
        url: "https://twitter-analysis-backend.herokuapp.com/getHistory",
        method: "POST",
        data: userData,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data == {}) {
            dispatch(userHistoryRetrieved([]));
          } else {
            dispatch(userHistoryRetrieved(res.data));
          }
        })
        .catch((err) => {
          dispatch(userHistoryRetrieved([]));
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
      <div className="sidebar-content log-out-div" onClick={onLogOutClick}>
        <i className="bx bx-log-out"></i>
        <span className="log-out-sidebar-label sidebar-text">Log out</span>
      </div>
    </div>
  );
}

export default Sidebar;
