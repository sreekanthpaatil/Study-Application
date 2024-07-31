/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.result;
      localStorage.setItem("user_info", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user_info");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;