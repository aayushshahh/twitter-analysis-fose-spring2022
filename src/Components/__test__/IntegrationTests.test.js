import React from "react";
import "@testing-library/jest-dom/extend-expect";
import App from "./../../App";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import userLogReducer from "./../../reducer";
import docStateReducer from "./../../documentStateSlice";

const ApiData = require("./mockData.json");
let store;
function createTestStore() {
  const store = configureStore({
    reducer: {
      userLogStatus: userLogReducer,
      docStateStatus: docStateReducer,
    },
  });
  return store;
}

afterEach(cleanup);
beforeEach(() => {
  store = createTestStore();
});

describe("User is able to get the tweets", () => {
  it("fetches the tweet", async () => {
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
    postSpy.mockResolvedValueOnce({ data: ApiData.tweets });
    await userEvent.click(screen.getByTestId("showTweets"));
    expect(postSpy).toHaveBeenCalled();
    expect(screen.getByText("This is the first tweet")).toBeInTheDocument();
  });
});

describe("User is able to get the personality", () => {
  it("fetches the personality", async () => {
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
    postSpy.mockResolvedValueOnce({ data: ApiData.personality });
    userEvent.click(screen.getByTestId("personalityTest"));
    expect(postSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText(/^@johndoe.*.INFP.*$/i)).toBeInTheDocument();
    });
  });
});

describe("User is able to login successfully", () => {
  it("logs the user in", async () => {
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
    postSpy.mockResolvedValueOnce({
      data: { message: "Logging Successful", data: ApiData.user },
    });
    userEvent.click(screen.getByTestId("logInButton"));
    expect(postSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText(/^Welcome.*.johndoe.*$/i)).toBeInTheDocument();
    });
  });
});
