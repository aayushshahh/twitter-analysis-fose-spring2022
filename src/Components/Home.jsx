import { useState } from "react";
import "./Home.css";

function Home() {
  const [twitUsername, setTwitUsername] = useState("");

  function handleTwitUsernameChange(event) {
    setTwitUsername(event.target.value);
  }

  return (
    <div className="home-base">
      <div className="heading-sentence">
        Who would you like to search for today?
      </div>
      <div className="input-fields">
        <label className="username-label">
          Twitter Username:
          <input
            className="username-input"
            type="text"
            name="username"
            placeholder="@whousername"
            value={twitUsername}
            onChange={handleTwitUsernameChange}
          ></input>
        </label>
      </div>
      <div className="action-buttons">
        <button type="button" className="show-tweets-button">
          SHOW TWEETS
        </button>
        <button type="button" className="analyse-profile-button">
          ANALYSE PERSONALITY
        </button>
      </div>
    </div>
  );
}

export default Home;
