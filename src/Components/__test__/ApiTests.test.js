import axios from "axios";

jest.mock("axios");

describe("test model api endpoint", () => {
  it("fetches the result based on the username provided", () => {
    const result = {
      description: "This is a personality description",
      title: "INFJ",
    };
    axios.post.mockResolvedValueOnce(result);
    return axios
      .post({
        url: "https://personalitydetection.herokuapp.com/predict_personality",
        data: { username: "@username" },
      })
      .then((res) => {
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith({
          data: { username: "@username" },
          url: "https://personalitydetection.herokuapp.com/predict_personality",
        });
        expect(res).toEqual(result);
      });
  });
});

describe("test getTweets endpoint", () => {
  it("fetches the tweets based on the username provided", () => {
    const result = {
      text: "This is a mock tweet",
    };
    axios.post.mockResolvedValueOnce(result);
    return axios
      .post({
        url: "https://twitter-analysis-backend.herokuapp.com/getTweets",
        data: { username: "@username" },
      })
      .then((res) => {
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith({
          data: { username: "@username" },
          url: "https://twitter-analysis-backend.herokuapp.com/getTweets",
        });
        expect(res).toEqual(result);
      });
  });
});

describe("test signup endpoint", () => {
  it("is a user able to signup properly", () => {
    const fakeUser = {
      username: "johndoe",
      email: "johndoe@email.com",
      fullName: "John Doe",
      password: "johndoe123",
    };
    const result = {
      message: "Logging Successful",
    };
    axios.post.mockResolvedValueOnce(result);
    return axios
      .post({
        url: "https://twitter-analysis-backend.herokuapp.com/signup",
        data: fakeUser,
      })
      .then((res) => {
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenLastCalledWith({
          data: fakeUser,
          url: "https://twitter-analysis-backend.herokuapp.com/signup",
        });
        expect(res).toEqual(result);
      });
  });
});

describe("test login endpoint", () => {
  it("is a user able to login properly", () => {
    const fakeUser = {
      username: "johndoe",
      password: "johndoe123",
    };
    const result = {
      message: "Logging Successful",
    };
    axios.post.mockResolvedValueOnce(result);
    return axios
      .post({
        url: "https://twitter-analysis-backend.herokuapp.com/login",
        data: fakeUser,
      })
      .then((res) => {
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenLastCalledWith({
          data: fakeUser,
          url: "https://twitter-analysis-backend.herokuapp.com/login",
        });
        expect(res).toEqual(result);
      });
  });
});
