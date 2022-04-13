import { useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [twitUsername, setTwitUsername] = useState("");

  function handleTwitUsernameChange(event) {
    setTwitUsername(event.target.value);
  }

  function analyseTweets() {
    if (twitUsername.charAt(0) !== "@") {
      var tempUsername = "@" + twitUsername;
      setTwitUsername(tempUsername);
    }
    axios({
      url: "https://personalitydetection.herokuapp.com/predict_personality",
      method: "POST",
      data: {
        username: twitUsername,
      },
    }).then((res) => {
      console.log(res.data);
    });
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
        <button
          type="button"
          className="analyse-profile-button"
          onClick={analyseTweets}
        >
          ANALYSE PERSONALITY
        </button>
      </div>
    </div>
  );
}

export default Home;
