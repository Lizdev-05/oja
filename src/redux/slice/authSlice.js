import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userName: null,
  userEmail: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Creating the actions to take place
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const { displayName, userEmail, userID } = action.payload;
      state.isLoggedIn = true;
      state.userName = displayName;
      state.userEmail = userEmail;
      state.userID = userID;
    },

    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.userName = null;
      state.userEmail = null;
      state.userID = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserName = (state) => state.auth.userName;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
