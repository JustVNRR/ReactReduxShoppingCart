import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SHOW_HIDE_MODAL,
  SHOW_MODAL,
  CHANGE_AVATAR
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("token"));

const initialState = user
  ? { isLoggedIn: true, user, modal: false }
  : { isLoggedIn: false, user: null, modal: false };

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        modal: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        modal: false
      };

    case SHOW_HIDE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };

      case SHOW_MODAL:
      return {
        ...state,
        modal: true,
      };

    case CHANGE_AVATAR:

      return{
        ...state,
        user: payload.user
      };

    default:
      return state;
  }
}
