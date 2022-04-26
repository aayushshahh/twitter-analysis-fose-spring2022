import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  screen,
  getByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "./../../App";
import { Provider, useSelector, useDispatch } from "react-redux";
import { resetState } from "../../documentStateSlice";
import store from "./../../store";
import axios from "axios";

const ApiData = require("./mockData.json");

afterEach(cleanup);

describe("User entered text is correct and tweets retrieved", () => {
  it("entered value is correct and tweets are retrieved", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    userEvent.type(screen.getByTestId("userInput"), "@johndoe");
    expect(screen.getByTestId("userInput")).toHaveAttribute(
      "value",
      "@johndoe"
    );
    const postSpy = jest.spyOn(axios, "post");
    postSpy.mockImplementationOnce(() => {
      Promise.resolve(ApiData.tweets);
    });
    userEvent.click(screen.getByTestId("showTweets"));
    expect(screen.getByTestId("tweetDisplay")).toBeInTheDocument();
  });
});

describe("User entered text is correct and personality is generated", () => {
  it("entered value is correct and personality is generated", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    userEvent.type(screen.getByTestId("userInput"), "@johndoe");
    expect(screen.getByTestId("userInput")).toHaveAttribute(
      "value",
      "@johndoe@johndoe"
    );
    const postSpy = jest.spyOn(axios, "post");
    postSpy.mockImplementationOnce(() => {
      Promise.resolve(ApiData.personality);
    });
    userEvent.click(screen.getByTestId("personalityTest"));
    expect(screen.getByTestId("personalityResult")).toBeInTheDocument();
  });
});

describe("login opens on button click", () => {
  it("button click opens login", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    userEvent.click(screen.getByTestId("signInButton"));
    expect(screen.getByTestId("loginModalTest")).toBeInTheDocument();
  });
});

describe("user is able to login successfully", () => {
  it("logs the user in", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    userEvent.click(screen.getByTestId("signInButton"));
    expect(screen.getByTestId("loginModalTest")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("loginUsername"), "johndoe");
    userEvent.type(screen.getByTestId("loginPassword"), "johndoe123");

    expect(screen.getByTestId("loginUsername")).toHaveAttribute(
      "value",
      "johndoe"
    );
    expect(screen.getByTestId("loginPassword")).toHaveAttribute(
      "value",
      "johndoe123"
    );

    const postSpy = jest.spyOn(axios, "post");
    postSpy.mockImplementationOnce(() => {
      Promise.resolve({
        message: "Logging Successful",
        data: { username: "@johndoe" },
      });
    });
    userEvent.click(screen.getByTestId("logInButton"));
    expect(screen.getByTestId("loggedUser")).toBeInTheDocument();
  });
});
