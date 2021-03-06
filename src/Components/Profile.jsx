import "./Profile.css";
import { useSelector } from "react-redux";

function Profile() {
  var counter = 0;
  const currentLoggedUser = useSelector((state) => state.userLogStatus);
  const userHistory = useSelector((state) => state.userLogStatus.history);
  if (currentLoggedUser.currentUser !== "") {
    return (
      <div className="profile-base" data-testid="profileBaseL">
        <div className="profile-div">
          <p className="profile-title">Your Profile</p>
          <p className="profile-name">
            <span className="title-span">Name:</span>{" "}
            {currentLoggedUser.currentUserName}
          </p>
          <p className="profile-username">
            <span className="title-span">Username:</span>{" "}
            {currentLoggedUser.currentUser}
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
      <div className="profile-base" data-testid="profileBaseNL">
        <div className="not-logged-in">Please Log in to View</div>
      </div>
    );
  }
}

export default Profile;
