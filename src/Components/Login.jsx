import { useState } from "react";
import "./Login.css";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  function onSubmitHandler(event) {
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
      <div className="login-title">Log In</div>
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
        <label className="password-login-label">
          Password
          <input
            className="password-login-input"
            type="password"
            value={passwordValue}
            onChange={handlePasswordChange}
          ></input>
        </label>
        <button type="submit" className="submit-button">
          LOG IN
        </button>
      </form>
    </div>
  );
}

export default Login;
