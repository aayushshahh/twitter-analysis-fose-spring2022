import { useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [twitUsername, setTwitUsername] = useState("");
  const [personalityUsername, setPersonalityUsername] = useState("");
  const [personalityResult, setPersonalityResult] = useState("");
  const [personalityDescription, setPersonalityDescription] = useState("");

  function userTweets() {
    var wtu = document.getElementsByClassName("wrong-twitter-username");
    axios({
      url: "https://twitter-analysis-backend.herokuapp.com/getTweets",
      method: "POST",
      data: {
        username: twitUsername,
      },
    })
      .then((res) => {
        var tweetData = res.data;
        tweetData.forEach((tweet) => {
          console.log(tweet.text);
        });
        // console.log(res.data);
        wtu[0].style.display = "none";
      })
      .catch((err) => {
        wtu[0].style.display = "inline-block";
      });
  }

  function handleTwitUsernameChange(event) {
    setTwitUsername(event.target.value);
  }

  function analyseTweets() {
    var wtu = document.getElementsByClassName("wrong-twitter-username");
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
    })
      .then((res) => {
        console.log(res.data);
        if (twitUsername.charAt(0) !== "@") {
          setPersonalityUsername("@" + twitUsername);
        } else {
          setPersonalityUsername(twitUsername);
        }
        setPersonalityResult(res.data.title);
        setPersonalityDescription(res.data.description);
        var resultDiv = document.getElementsByClassName("personality-result");
        resultDiv[0].style.display = "block";
        wtu[0].style.display = "none";
      })
      .catch((err) => {
        wtu[0].style.display = "inline-block";
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
        <div className="error-div-home">
          <span className="wrong-twitter-username">
            user not found / wrong username
          </span>
        </div>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className="show-tweets-button"
          onClick={userTweets}
        >
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
      <div className="personality-result">
        <p className="personality-result-title">
          {personalityUsername} has the personality {personalityResult}
        </p>
        <p className="personality-result-description">
          {personalityDescription}
        </p>
      </div>
    </div>
  );
}

export default Home;
