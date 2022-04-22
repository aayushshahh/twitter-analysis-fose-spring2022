import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Sidebar from "./../Sidebar";
import Home from "./../Home";
import Profile from "./../Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./../../store";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" exact element={<Profile />} />
          </Routes>
        </Router>
      </Provider>
    </div>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <div>
      <Provider store={store}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" exact element={<Profile />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  ).toJSON;
  expect(tree).toMatchSnapshot();
});
