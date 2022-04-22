import { configureStore } from "@reduxjs/toolkit";
import userLogReducer from "./reducer";

const store = configureStore({
  reducer: {
    userLogStatus: userLogReducer,
  },
});

export default store;
