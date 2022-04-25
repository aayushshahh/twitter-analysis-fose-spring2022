import axios from "axios";
import { useState } from "react";
import "./LoginSignup.css";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "./../reducer";

let globalVariables = require("./../globalVariables");

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const currentLoggedUser = useSelector(
    (state) => state.userLogStatus.currentUser
  );
  const dispatch = useDispatch();
  function onSubmitHandler(event) {
    var eu = document.getElementsByClassName("empty-username");
    var ep = document.getElementsByClassName("empty-password");
    var iu = document.getElementsByClassName("incorrect-username");
    var ip = document.getElementsByClassName("incorrect-password");

    var logButton = document.getElementsByClassName("login-button");
    var signButtom = document.getElementsByClassName("signup-button");
    var logUser = document.getElementsByClassName("logged-user");
    if (usernameValue === "") {
      eu[0].style.display = "inline-block";
    } else {
      eu[0].style.display = "none";
    }
    if (passwordValue === "") {
      ep[0].style.display = "inline-block";
    } else {
      ep[0].style.display = "none";
    }
    if (usernameValue !== "" && passwordValue !== "") {
      var userLog = {
        userCred: usernameValue,
        userPassword: passwordValue,
      };
      axios({
        url: "http://localhost:8080/login",
        method: "POST",
        data: userLog,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "Logging Successful") {
            console.log(res.data.data);
            logButton[0].style.display = "none";
            signButtom[0].style.display = "none";
            logUser[0].style.display = "block";
            document.getElementById("loginModal").className = "login-modal";
            iu[0].style.display = "none";
            ip[0].style.display = "none";
            globalVariables.currentUser = usernameValue;
            var userDeets = {
              username: res.data.data.username,
              email: res.data.data.email,
              name: res.data.data.fullName,
            };
            dispatch(userLoggedIn(userDeets));
            //Clear all the values of the hooks
            setUsernameValue("");
            setPasswordValue("");
          } else if (
            res.data.message === "Username Incorrect" ||
            res.data.message === "Email Incorrect"
          ) {
            iu[0].style.display = "inline-block";
          } else if (res.data.message === "Password Incorrect") {
            ip[0].style.display = "inline-block";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    event.preventDefault();
  }
  function handleUsernameChange(event) {
    setUsernameValue(event.target.value);
  }
  function handlePasswordChange(event) {
    setPasswordValue(event.target.value);
  }
  function closeButtonClick() {
    document.getElementById("loginModal").className = "login-modal";
  }
  return (
    <div id="loginModal" className="login-modal">
      <i className="bx bx-x" onClick={closeButtonClick}></i>
      <div className="login-title">Sign In</div>
      <form onSubmit={onSubmitHandler}>
        <label className="username-login-label">
          Username/E-mail
          <input
            className="username-login-input"
            type="text"
            placeholder="whoisthis@whomail.com / whousername"
            value={usernameValue}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <div className="error-div">
          <span className="empty-username">
            username/email can not be empty
          </span>
          <span className="incorrect-username">incorrect username/email</span>
        </div>
        <label className="password-login-label">
          Password
          <input
            className="password-login-input"
            type="password"
            placeholder="s3cret"
            value={passwordValue}
            onChange={handlePasswordChange}
          ></input>
        </label>
        <div className="error-div">
          <span className="empty-password">password can not be empty</span>
          <span className="incorrect-password">incorrect password</span>
        </div>
        <button type="submit" className="submit-button">
          LOG IN
        </button>
      </form>
    </div>
  );
}

export default Login;
