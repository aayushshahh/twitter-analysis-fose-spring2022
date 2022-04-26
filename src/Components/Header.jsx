import { useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";

let globalVariables = require("./../globalVariables");

function Header() {
  const currentLoggedUser = useSelector(
    (state) => state.userLogStatus.currentUser
  );
  function onLogButtonClick() {
    document.getElementById("loginModal").className = "login-modal-active";
  }
  function onSignUpButtonClick() {
    document.getElementById("signupModal").className = "signup-modal-active";
  }

  return (
    <div className="header-base">
      <a href="/" className="header-title-link">
        TWITTER ANALYSIS
      </a>
      <button
        type="button"
        className="login-button"
        onClick={onLogButtonClick}
        data-testid="signInButton"
      >
        SIGN IN
      </button>
      <button
        type="button"
        className="signup-button"
        onClick={onSignUpButtonClick}
        data-testid="signUpButton"
      >
        SIGN UP
      </button>
      <div className="logged-user" data-testid="loggedUser">
        Welcome {currentLoggedUser} :)
      </div>
    </div>
  );
}

export default Header;
