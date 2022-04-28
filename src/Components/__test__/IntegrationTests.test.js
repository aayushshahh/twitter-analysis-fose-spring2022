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
    userEvent.click(screen.getByTestId("showTweets"));
    expect(postSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText("This is the first tweet")).toBeInTheDocument();
    });
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

describe("User is able to signup successfully", () => {
  it("signs up a new user", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    userEvent.click(screen.getByTestId("signUpButton"));
    expect(screen.getByTestId("signupModalTest")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("signupEmail"), "johndoe@gmail.com");
    userEvent.type(screen.getByTestId("signupUsername"), "johndoe");
    userEvent.type(screen.getByTestId("signupName"), "John Doe");
    userEvent.type(screen.getByTestId("signupPassword"), "johndoe123");
    userEvent.type(screen.getByTestId("signupCPassword"), "johndoe123");
    expect(screen.getByTestId("signupEmail")).toHaveAttribute(
      "value",
      "johndoe@gmail.com"
    );
    expect(screen.getByTestId("signupUsername")).toHaveAttribute(
      "value",
      "johndoe"
    );
    expect(screen.getByTestId("signupName")).toHaveAttribute(
      "value",
      "John Doe"
    );
    expect(screen.getByTestId("signupPassword")).toHaveAttribute(
      "value",
      "johndoe123"
    );
    expect(screen.getByTestId("signupCPassword")).toHaveAttribute(
      "value",
      "johndoe123"
    );
    const postSpy = jest.spyOn(axios, "post");
    postSpy.mockResolvedValueOnce({
      message: "Logging Successfull",
      data: ApiData.user,
    });
    userEvent.click(screen.getByTestId("submitButtonSignup"));
    expect(postSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText(/^Welcome.*.johndoe.*$/i)).toBeInTheDocument();
    });
  });
});

describe("Profile shows proper info on logging in / signing in", () => {
  it("displays the correct details on user log in", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    userEvent.click(screen.getByTestId("signInButton"));
    expect(screen.getByTestId("loginModalTest")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("loginUsername"), "johndoe");
    userEvent.type(screen.getByTestId("loginPassword"), "johndoe123");
    const postSpy = jest.spyOn(axios, "post");
    postSpy.mockResolvedValueOnce({
      data: { message: "Logging Successful", data: ApiData.user },
    });
    userEvent.click(screen.getByTestId("logInButton"));
    await waitFor(() => {
      expect(screen.getByText(/^Welcome.*.johndoe.*$/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId("profileButton"));
    await waitFor(() => {
      expect(screen.getByTestId("profileBaseL")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/john.*.doe/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/^no.*.history.*$/i)).toBeInTheDocument();
    });
  });
});

describe("User is able to log out successfully", () => {
  it("logs the user out", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    userEvent.click(screen.getByTestId("signInButton"));
    expect(screen.getByTestId("loginModalTest")).toBeInTheDocument();
    userEvent.type(screen.getByTestId("loginUsername"), "johndoe");
    userEvent.type(screen.getByTestId("loginPassword"), "johndoe123");
    const postSpy = jest.spyOn(axios, "post");
    postSpy.mockResolvedValueOnce({
      data: { message: "Logging Successful", data: ApiData.user },
    });
    userEvent.click(screen.getByTestId("logInButton"));
    await waitFor(() => {
      expect(screen.getByText(/^Welcome.*.johndoe.*$/i)).toBeInTheDocument();
    });
    //The user is logged in
    userEvent.click(screen.getByTestId("logoutButton"));
    await waitFor(() => {
      expect(screen.queryByText(/^Welcome.*.johndoe.*$/i)).toEqual(null);
    });
    userEvent.click(screen.getByTestId("profileButton"));
    expect(screen.getByTestId("profileBaseNL")).toBeInTheDocument();
    expect(screen.queryByTestId("profileBaseL")).toEqual(null);
  });
});
