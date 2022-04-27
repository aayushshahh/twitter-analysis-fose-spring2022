import { useState } from "react";
import axios from "axios";
import "./Home.css";
import globalVariables from "../globalVariables";
import { useSelector, useDispatch } from "react-redux";
import {
  twitUsernameChange,
  setTweetData,
  setPersonalityData,
} from "./../documentStateSlice";

function Home() {
  const currentLoggedUser = useSelector(
    (state) => state.userLogStatus.currentUser
  );
  const twitUsername = useSelector(
    (state) => state.docStateStatus.twitUsernameChange
  );
  const personalityData = useSelector(
    (state) => state.docStateStatus.personality
  );
  const tweetData = useSelector((state) => state.docStateStatus.tweetData);
  const dispatch = useDispatch();

  function userTweets() {
    var wtu = document.getElementsByClassName("wrong-twitter-username");
    var resultDiv = document.getElementsByClassName("personality-result");
    var tweetDiv = document.getElementsByClassName("tweet-display");
    axios({
      url: "https://twitter-analysis-backend.herokuapp.com/getTweets",
      method: "POST",
      data: {
        username: twitUsername,
      },
    })
      .then((res) => {
        var tempTweets = res.data;
        console.log(res.data);
        dispatch(setTweetData(tempTweets));
        wtu[0].style.display = "none";
        resultDiv[0].style.display = "none";
        tweetDiv[0].style.display = "block";
      })
      .catch((err) => {
        wtu[0].style.display = "inline-block";
        resultDiv[0].style.display = "none";
        tweetDiv[0].style.display = "none";
      });
  }

  function handleTwitUsernameChange(event) {
    dispatch(twitUsernameChange(event.target.value));
  }

  async function analyseTweets() {
    var wtu = document.getElementsByClassName("wrong-twitter-username");
    var tweetDiv = document.getElementsByClassName("tweet-display");
    var resultDiv = document.getElementsByClassName("personality-result");
    var pResult = "";
    if (twitUsername.charAt(0) !== "@") {
      var tempUsername = "@" + twitUsername;
      dispatch(twitUsernameChange(tempUsername));
    }
    await axios({
      url: "https://personalitydetection.herokuapp.com/predict_personality",
      method: "POST",
      data: {
        username: twitUsername,
      },
    })
      .then((res) => {
        console.log(res.data);
        var personalityTempData = {
          username: "",
          result: "",
          description: "",
        };
        if (twitUsername.charAt(0) !== "@") {
          personalityTempData.username = "@" + twitUsername;
        } else {
          personalityTempData.username = twitUsername;
        }
        pResult = res.data.title;
        personalityTempData.result = res.data.title;
        personalityTempData.description = res.data.description;
        dispatch(setPersonalityData(personalityTempData));
        if (currentLoggedUser !== "") {
          var historyData = {
            username: currentLoggedUser,
            history: {
              twitUsername: twitUsername,
              personality: pResult,
            },
          };
          axios({
            url: "https://twitter-analysis-backend.herokuapp.com/addHistory",
            method: "POST",
            data: historyData,
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        resultDiv[0].style.display = "block";
        wtu[0].style.display = "none";
        tweetDiv[0].style.display = "none";
      })
      .catch((err) => {
        wtu[0].style.display = "inline-block";
        tweetDiv[0].style.display = "none";
        resultDiv[0].style.display = "none";
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
            data-testid="userInput"
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
          data-testid="showTweets"
        >
          SHOW TWEETS
        </button>
        <button
          type="button"
          className="analyse-profile-button"
          data-testid="personalityTest"
          onClick={analyseTweets}
        >
          ANALYSE PERSONALITY
        </button>
      </div>
      <div className="personality-result" data-testid="personalityResult">
        <p className="personality-result-title" data-testid="perTitle">
          {personalityData.personalityUsername} has the personality{" "}
          {personalityData.personalityResult}
        </p>
        <p className="personality-result-description">
          {personalityData.personalityDesc}
        </p>
      </div>
      <div className="tweet-display" data-testid="tweetDisplay">
        <div className="tweet-heading">Recent Tweets</div>
        {tweetData.map((tweets) => {
          return (
            <div className="tweet-list" key={tweets.id}>
              <p className="tweet-username">{twitUsername}</p>
              <p className="tweet-data">{tweets.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
