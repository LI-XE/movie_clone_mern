import { configureStore } from "@reduxjs/toolkit";
import {
  userAuthReducer,
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

// console.log(initialState.userSignin.userInfo);

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    userDetails: userDitailsReducer,
    userAuth: userAuthReducer,
  },
  preloadedState: initialState,
});

export default store;
