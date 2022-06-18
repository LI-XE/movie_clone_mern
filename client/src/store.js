import { configureStore } from "@reduxjs/toolkit";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

// console.log(initialState.userSignin.userInfo);

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
  },
  preloadedState: initialState,
});

export default store;
