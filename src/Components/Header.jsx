import "./Header.css";

function Header() {
  var logButtonStatus = false;
  function onLogButtonClick() {
    if (!logButtonStatus) {
      document.getElementById("loginModal").className = "login-modal-active";
      logButtonStatus = true;
    } else {
      document.getElementById("loginModal").className = "login-modal";
      logButtonStatus = false;
    }
  }

  return (
    <div className="header-base">
      <a href="/" className="header-title-link">
        TWITTER ANALYSIS
      </a>
      <button type="button" className="login-button" onClick={onLogButtonClick}>
        LOG IN
      </button>
      <button type="button" className="signup-button">
        SIGN UP
      </button>
    </div>
  );
}

export default Header;
