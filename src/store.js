import { configureStore } from "@reduxjs/toolkit";
import userLogReducer from "./reducer";
import docStateReducer from "./documentStateSlice";

const store = configureStore({
  reducer: {
    userLogStatus: userLogReducer,
    docStateStatus: docStateReducer,
  },
});

export default store;
