import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE,
    SHOW_HIDE_MODAL,
    SHOW_MODAL,
    CHANGE_AVATAR,
    CHANGE_AVATAR_FAIL
  } from "./types";
  
  import AuthService from "../../services/auth.service";
  
  export const signUp = (credentials) => (dispatch) => {
    return AuthService.register(credentials).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: CLEAR_MESSAGE,
          payload: null,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const signIn = (credentials) => (dispatch) => {

    return AuthService.login(credentials).then(
     
      (data) => {

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        dispatch({
          type: CLEAR_MESSAGE
        });
        return Promise.resolve();
      },
      (error) => {

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log("error")
        // console.log(error)
        // console.log("message")
        // console.log(message)
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: {message : message},
        });
  
        return Promise.reject(message);

      }
    );
  };

  export const signOut = (credentials) => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });

    // dispatch({
    //   type: CLEAR_MESSAGE
    // });
  };

  export const changeAvatar = (id, formdata) => (dispatch) => {

    return AuthService.changeAvatar(id, formdata).then(
     
      (data) => {
        dispatch({
          type: CHANGE_AVATAR,
          payload: { user:data },
        });

        dispatch({
          type: CLEAR_MESSAGE
        });
        return Promise.resolve();
      },
      (error) => {
        
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          // console.log("message error action change avatar")
          // console.log(message)
  
        dispatch({
          type: CHANGE_AVATAR_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: {message : message.message},
        });
  
        return Promise.reject(message.message);
      }
    );
  };

  export const showHideModale = () => {

    return (dispatch) => {

        dispatch({
            type: SHOW_HIDE_MODAL,
            payload: null
        });
    }
}
export const showModale = () => {

  return (dispatch) => {

      dispatch({
          type: SHOW_MODAL,
          payload: null
      });
  }
}
  