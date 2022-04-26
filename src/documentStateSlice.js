import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  twitUsernameChange: "",
  personality: {
    personalityUsername: "",
    personalityResult: "",
    personalityDesc: "",
  },
  tweetData: [],
  usernameLSChange: "",
  emailLSChange: "",
  fullNameLSChange: "",
  passwordLSChange: "",
  confirmPassLSChange: "",
  homeActive: true,
  profileActive: false,
};

export const docStateSlice = createSlice({
  name: "docStatesStatus",
  initialState,
  reducers: {
    twitUsernameChange: (state, action) => {
      state.twitUsernameChange = action.payload;
    },
    setTweetData: (state, action) => {
      state.tweetData = action.payload;
    },
    setPersonalityData: (state, action) => {
      state.personality.personalityUsername = action.payload.username;
      state.personality.personalityResult = action.payload.result;
      state.personality.personalityDesc = action.payload.description;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
});

export const {
  twitUsernameChange,
  setTweetData,
  setPersonalityData,
  resetState,
} = docStateSlice.actions;

export default docStateSlice.reducer;
