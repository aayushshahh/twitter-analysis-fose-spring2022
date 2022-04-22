// {
//     currentUser: '@username'
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  history: [],
};

export const userLogSlice = createSlice({
  name: "userLogStatus",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.currentUser = action.payload;
    },
    userLoggedOut: (state) => {
      state.currentUser = "";
      state.history = [];
    },
    userHistoryRetrieved: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userHistoryRetrieved } =
  userLogSlice.actions;

export default userLogSlice.reducer;
