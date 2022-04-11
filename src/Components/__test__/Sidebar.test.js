import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Sidebar from "./../Sidebar";
import Home from "./../Home";
import Profile from "./../Profile";
import History from "./../History";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/history" exact element={<History />} />
        </Routes>
      </Router>
    </div>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/history" exact element={<History />} />
        </Routes>
      </Router>
    </div>
  ).toJSON;
  expect(tree).toMatchSnapshot();
});
