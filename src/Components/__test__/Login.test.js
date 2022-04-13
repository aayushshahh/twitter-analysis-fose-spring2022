import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Login from "./../Login";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<Login />).toJSON;
  expect(tree).toMatchSnapshot();
});
