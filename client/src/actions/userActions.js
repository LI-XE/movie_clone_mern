import Axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../types/userTypes";

export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, password },
  });
  try {
    const { data } = await Axios.post(
      "http://localhost:5000/api/users/register",
      {
        name,
        email,
        password,
      }
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await Axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/signin";
};

export const detailsUser = (_id) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: _id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`http://localhost:5000/api/users/${_id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

// import axios from "axios";
// import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
// import { USER_SERVER } from "../Config.js";

// export function registerUser(dataToSubmit) {
//   const request = axios
//     .post(`${USER_SERVER}/register`, dataToSubmit)
//     .then((response) => response.data);

//   return {
//     type: REGISTER_USER,
//     payload: request,
//   };
// }

// export function loginUser(dataToSubmit) {
//   const request = axios
//     .post(`${USER_SERVER}/login`, dataToSubmit)
//     .then((response) => response.data);

//   return {
//     type: LOGIN_USER,
//     payload: request,
//   };
// }

// export function auth() {
//   const request = axios
//     .get(`${USER_SERVER}/auth`)
//     .then((response) => response.data);

//   return {
//     type: AUTH_USER,
//     payload: request,
//   };
// }

// export function logoutUser() {
//   const request = axios
//     .get(`${USER_SERVER}/logout`)
//     .then((response) => response.data);

//   return {
//     type: LOGOUT_USER,
//     payload: request,
//   };
// }
