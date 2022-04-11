import "./Header.css";

function Header() {
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
      <button type="button" className="login-button" onClick={onLogButtonClick}>
        SIGN IN
      </button>
      <button
        type="button"
        className="signup-button"
        onClick={onSignUpButtonClick}
      >
        SIGN UP
      </button>
    </div>
  );
}

export default Header;
