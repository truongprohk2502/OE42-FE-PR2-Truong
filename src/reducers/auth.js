import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: "",
    pending: false,
    error: null,
  },
  reducers: {
    postLogin: (state) => {
      state.pending = true;
      state.error = null;
    },
    postLoginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.pending = false;
      state.error = null;
    },
    postLoginFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getUserInfo: (state) => {
      state.pending = true;
      state.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.pending = false;
      state.error = null;
    },
    getUserInfoFailed: (state, action) => {
      state.user = {};
      state.token = null;
      state.pending = false;
      state.error = action.payload;
    },
    postSignUp: (state) => {
      state.pending = true;
      state.error = null;
    },
    postSignUpSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.pending = false;
      state.error = null;
    },
    postSignUpFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putPersonalInfo: (state) => {
      state.pending = true;
      state.error = null;
    },
    putPersonalInfoSuccess: (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.error = null;
    },
    putPersonalInfoFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putPassword: (state) => {
      state.pending = true;
      state.error = null;
    },
    putPasswordSuccess: (state, action) => {
      state.user = { ...state.user, password: action.payload };
      state.pending = false;
      state.error = null;
    },
    putPasswordFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.pending = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = {};
      state.token = null;
      state.pending = false;
      state.error = null;
    },
    logoutFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  postLogin,
  postLoginSuccess,
  postLoginFailed,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailed,
  postSignUp,
  postSignUpSuccess,
  postSignUpFailed,
  putPersonalInfo,
  putPersonalInfoSuccess,
  putPersonalInfoFailed,
  putPassword,
  putPasswordSuccess,
  putPasswordFailed,
  logout,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
