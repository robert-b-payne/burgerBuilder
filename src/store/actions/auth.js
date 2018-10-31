import * as actionTypes from "./actionTypes";
import axios from "axios";

const API_KEY = "AIzaSyATD4XZ-2Ly3bqhcjSYmkgRGkm4Cj2DxeY";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFailure = error => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .then(response => {
        console.log("authentication complete!");
        console.log(response.data);
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.log("auth failed!");
        console.log(error.response.data.error.message);
        dispatch(authFailure(error));
      });
  };
};

export const loginSuccess = data => ({
  type: actionTypes.LOGIN_SUCCESS,
  loginData: data
});

export const loginFailure = err => ({
  type: actionTypes.LOGIN_FAILURE,
  loginError: err
});

export const login = (email, password) => {
  return dispatch => {
    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .then(res => {
        console.log(res.data);
        dispatch(loginSuccess(res));
      })
      .catch(err => {
        console.log(err.data);
        dispatch(loginFailure(err));
      });
  };
};
