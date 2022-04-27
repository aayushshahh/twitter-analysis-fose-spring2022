import { useState } from "react";
import * as EmailValidator from "email-validator";
import axios from "axios";
import "./LoginSignup.css";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "./../reducer";

let globalVariables = require("./../globalVariables");

function Signup() {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [fullNameValue, setFullNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const dispatch = useDispatch();

  function onSubmitHandler(event) {
    var em = document.getElementsByClassName("incorrect-email");
    var du = document.getElementsByClassName("duplicate-username");
    var efn = document.getElementsByClassName("empty-name");
    var ep = document.getElementsByClassName("empty-password-signup");
    var cp = document.getElementsByClassName("match-passwords");

    var logButton = document.getElementsByClassName("login-button");
    var signButtom = document.getElementsByClassName("signup-button");
    var logUser = document.getElementsByClassName("logged-user");
    if (
      EmailValidator.validate(emailValue) &&
      usernameValue !== "" &&
      fullNameValue !== "" &&
      passwordValue !== "" &&
      confirmPasswordValue === passwordValue
    ) {
      // form data send for signup
      var newUser = {
        email: emailValue,
        username: usernameValue,
        fullName: fullNameValue,
        password: passwordValue,
      };
      axios
        .post("https://twitter-analysis-backend.herokuapp.com/signup", {
          data: newUser,
        })
        .then((res) => {
          console.log(res);
          logButton[0].style.display = "none";
          signButtom[0].style.display = "none";
          logUser[0].style.display = "block";
          document.getElementById("signupModal").className = "signup-modal";
          globalVariables.currentUser = usernameValue;
          var userDeets = {
            username: usernameValue,
            email: emailValue,
            name: fullNameValue,
          };
          dispatch(userLoggedIn(userDeets));
          //Clear all the values of the hooks
          setEmailValue("");
          setUsernameValue("");
          setFullNameValue("");
          setPasswordValue("");
          setConfirmPasswordValue("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!EmailValidator.validate(emailValue)) {
        em[0].style.display = "inline-block";
      } else {
        em[0].style.display = "none";
      }
      if (usernameValue === "") {
        du[0].style.display = "inline-block";
      } else {
        du[0].style.display = "none";
      }
      if (fullNameValue === "") {
        efn[0].style.display = "inline-block";
      } else {
        efn[0].style.display = "none";
      }
      if (passwordValue === "") {
        ep[0].style.display = "inline-block";
      } else {
        ep[0].style.display = "inline-block";
      }
      if (confirmPasswordValue !== passwordValue) {
        cp[0].style.display = "inline-block";
      } else {
        cp[0].style.display = "none";
      }
    }
    event.preventDefault();
  }
  function handleEmailChange(event) {
    var email = event.target.value;
    var em = document.getElementsByClassName("incorrect-email");
    setEmailValue(email);
    if (EmailValidator.validate(email)) {
      em[0].style.display = "none";
    } else {
      em[0].style.display = "inline-block";
    }
  }
  function handleUsernameChange(event) {
    setUsernameValue(event.target.value);
  }
  function handleFullNameChange(event) {
    var fullName = event.target.value;
    var efn = document.getElementsByClassName("empty-name");
    setFullNameValue(fullName);
    if (fullName === "") {
      efn[0].style.display = "inline-block";
    } else {
      efn[0].style.display = "none";
    }
  }
  function handlePasswordChange(event) {
    var password = event.target.value;
    var ep = document.getElementsByClassName("empty-password-signup");
    setPasswordValue(password);
    if (password === "") {
      ep[0].style.display = "inline-block";
    } else {
      ep[0].style.display = "none";
    }
  }
  function handleConfirmPasswordChange(event) {
    var cPassword = event.target.value;
    var cp = document.getElementsByClassName("match-passwords");
    setConfirmPasswordValue(cPassword);
    if (cPassword !== passwordValue) {
      cp[0].style.display = "inline-block";
    } else {
      cp[0].style.display = "none";
    }
  }
  function closeButtonClick() {
    document.getElementById("signupModal").className = "signup-modal";
  }
  return (
    <div
      id="signupModal"
      className="signup-modal"
      data-testid="signupModalTest"
    >
      <i className="bx bx-x" onClick={closeButtonClick}></i>
      <div className="login-title">Sign Up</div>
      <form onSubmit={onSubmitHandler}>
        <label className="username-login-label">
          E-mail
          <input
            className="username-login-input"
            type="email"
            placeholder="whoisthis@whomail.com"
            data-testid="signupEmail"
            value={emailValue}
            onChange={handleEmailChange}
          ></input>
        </label>
        <div className="error-div">
          <span className="incorrect-email">please enter a valid email</span>
        </div>
        <label className="username-login-label">
          Username
          <input
            className="username-login-input"
            type="text"
            placeholder="whousername"
            data-testid="signupUsername"
            value={usernameValue}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <div className="error-div">
          <span className="duplicate-username">
            username already taken / username cannot be empty
          </span>
        </div>
        <label className="username-login-label">
          Full Name
          <input
            className="username-login-input"
            type="text"
            placeholder="John Doe"
            data-testid="signupName"
            value={fullNameValue}
            onChange={handleFullNameChange}
          ></input>
        </label>
        <div className="error-div">
          <span className="empty-name">Please enter a name</span>
        </div>
        <label className="password-login-label">
          Enter Password
          <input
            className="password-login-input"
            type="password"
            placeholder="s3cret"
            data-testid="signupPassword"
            value={passwordValue}
            onChange={handlePasswordChange}
          ></input>
        </label>
        <div className="error-div">
          <span className="empty-password-signup">please enter a password</span>
        </div>
        <label className="password-login-label">
          Confirm Password
          <input
            className="password-login-input"
            type="password"
            placeholder="s3cret"
            data-testid="signupCPassword"
            value={confirmPasswordValue}
            onChange={handleConfirmPasswordChange}
          ></input>
        </label>
        <div className="error-div">
          <span className="match-passwords">passwords do not match</span>
        </div>
        <button
          type="submit"
          className="submit-button"
          data-testid="submitButtonSignup"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default Signup;
