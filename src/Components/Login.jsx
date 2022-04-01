import { useState } from "react";
import "./Login.css";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  function onSubmitHandler(event) {
    event.preventDefault();
  }
  function handleUsernameChange(event) {}
  function handlePasswordChange(event) {}
  return (
    <div id="loginModal" className="login-modal">
      <div className="login-title">Log In</div>
      <form onSubmit={onSubmitHandler}>
        <label className="username-login-label">
          Username/E-mail
          <input
            type="text"
            value={usernameValue}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <label className="password-login-label">
          Password
          <input
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
