import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.isLogin = true;
    },
    onLogout: (state, action) => {
      state.isLogin = false
    }
  }
})

export const {onLogin, onLogout} = loginSlice.actions;

export default loginSlice.reducer;