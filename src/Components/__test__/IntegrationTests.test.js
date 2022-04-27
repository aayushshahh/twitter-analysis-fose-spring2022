import React from "react";
import "@testing-library/jest-dom/extend-expect";
import App from "./../../App";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { cleanup, render, screen } from "@testing-library/react";
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
jest.mock("axios");

describe("User is able to get the tweets", () => {
  it("fetches the tweet", () => {
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
    axios.mockResolvedValueOnce({ data: ApiData.tweets });
    userEvent.click(screen.getByTestId("showTweets"));
    expect(axios).toHaveBeenCalled();
  });
});

describe("User is able to get the personality", () => {
  it("fetches the personality", () => {
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
    axios.mockResolvedValueOnce({ data: ApiData.personality });
    userEvent.click(screen.getByTestId("personalityTest"));
    expect(axios).toHaveBeenCalled();
  });
});
