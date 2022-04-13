import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Signup from "./../Signup";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Signup />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<Signup />).toJSON;
  expect(tree).toMatchSnapshot();
});
