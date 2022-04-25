import { createSlice } from "@reduxjs/toolkit";

//payload = {
//username: "",
//email: "",
//name: ""
//}

const initialState = {
  currentUser: "",
  currentUserEmail: "",
  currentUserName: "",
  history: [],
};

export const userLogSlice = createSlice({
  name: "userLogStatus",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.currentUser = action.payload.username;
      state.currentUserEmail = action.payload.email;
      state.currentUserName = action.payload.name;
    },
    userLoggedOut: (state) => {
      state.currentUser = "";
      state.currentUserEmail = "";
      state.currentUserName = "";
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
