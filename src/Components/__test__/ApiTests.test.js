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
        expect(res).toEqual(result);
      });
  });
});
