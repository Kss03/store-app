import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './reducers/Login/Login';


export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});