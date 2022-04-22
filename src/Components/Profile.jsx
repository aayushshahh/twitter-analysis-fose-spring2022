import "./Profile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

function Profile() {
  var counter = 0;
  const currentLoggedUser = useSelector(
    (state) => state.userLogStatus.currentUser
  );
  const userHistory = useSelector((state) => state.userLogStatus.history);
  if (currentLoggedUser !== "") {
    return (
      <div className="profile-base">
        <div className="profile-div">
          <p className="profile-title">Your Profile</p>
          <p className="profile-name">
            <span className="title-span">Name:</span> Aayush Shah
          </p>
          <p className="profile-username">
            <span className="title-span">Username:</span> aayush2597
          </p>
        </div>
        <div className="history-div">
          <p className="history-title">Your History</p>
          <table className="history-table">
            <thead>
              <tr>
                <th className="username-table">Twitter Username</th>
                <th className="personality-table">Personality</th>
              </tr>
            </thead>
            <tbody>
              {userHistory.map((histItem) => {
                counter++;
                return (
                  <tr key={counter}>
                    <td>{histItem.twitUsername}</td>
                    <td>{histItem.personality}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-base">
        <div className="not-logged-in">Please Log in to View</div>
      </div>
    );
  }
}

export default Profile;
