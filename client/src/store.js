import { configureStore } from "@reduxjs/toolkit";
import {
  userDitailsReducer,
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

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    userDetails: userDitailsReducer,
    initialState,
  },
});

export default store;
