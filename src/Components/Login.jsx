import { useState } from "react";
import "./LoginSignup.css";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  function onSubmitHandler(event) {
    var eu = document.getElementsByClassName("empty-username");
    var ep = document.getElementsByClassName("empty-password");
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
