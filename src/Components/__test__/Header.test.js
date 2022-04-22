import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Header from "./../Header";
import { Provider } from "react-redux";
import store from "./../../store";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Header />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Header />
    </Provider>
  ).toJSON;
  expect(tree).toMatchSnapshot();
});
