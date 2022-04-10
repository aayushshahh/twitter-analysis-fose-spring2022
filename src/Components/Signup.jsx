import { useState } from "react";
import "./LoginSignup.css";

function Signup() {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [fullNameValue, setFullNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  function onSubmitHandler(event) {
    event.preventDefault();
  }
  function handleEmailChange(event) {}
  function handleUsernameChange(event) {
    setUsernameValue(event.target.value);
  }
  function handleFullNameChange(event) {}
  function handlePasswordChange(event) {
    setPasswordValue(event.target.value);
  }
  function handleConfirmPasswordChange(event) {}
  function closeButtonClick() {
    document.getElementById("signupModal").className = "signup-modal";
  }
  return (
    <div id="signupModal" className="signup-modal">
      <i className="bx bx-x" onClick={closeButtonClick}></i>
      <div className="login-title">Sign Up</div>
      <form onSubmit={onSubmitHandler}>
        <label className="username-login-label">
          E-mail
          <input
            className="username-login-input"
            type="email"
            value={emailValue}
            onChange={handleEmailChange}
          ></input>
        </label>
        <label className="username-login-label">
          Username
          <input
            className="username-login-input"
            type="text"
            value={usernameValue}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <label className="username-login-label">
          Full Name
          <input
            className="username-login-input"
            type="text"
            value={fullNameValue}
            onChange={handleFullNameChange}
          ></input>
        </label>
        <label className="password-login-label">
          Enter Password
          <input
            className="password-login-input"
            type="password"
            value={passwordValue}
            onChange={handlePasswordChange}
          ></input>
        </label>
        <label className="password-login-label">
          Confirm Password
          <input
            className="password-login-input"
            type="password"
            value={confirmPasswordValue}
            onChange={handleConfirmPasswordChange}
          ></input>
        </label>
        <button type="submit" className="submit-button">
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default Signup;
