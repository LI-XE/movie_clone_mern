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

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const userDitailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// import {
//   LOGIN_USER,
//   REGISTER_USER,
//   AUTH_USER,
//   LOGOUT_USER,
// } from "../types/userTypes";

// // eslint-disable-next-line import/no-anonymous-default-export
// export default function (state = {}, action) {
//   switch (action.type) {
//     case REGISTER_USER:
//       return { ...state, register: action.payload };
//     case LOGIN_USER:
//       return { ...state, loginSucces: action.payload };
//     case AUTH_USER:
//       return { ...state, userData: action.payload };
//     case LOGOUT_USER:
//       return { ...state };
//     default:
//       return state;
//   }
// }
