import * as actionTypes from "./actionTypes";
import axios from "axios";

// const API_KEY = "AIzaSyATD4XZ-2Ly3bqhcjSYmkgRGkm4Cj2DxeY";   //kangaroofromchina
const API_KEY = "AIzaSyAMtBA6w450h8KTTdZ5XGDDgV1t5mP4d0M"; //superburgerbuilder

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    localId: localId
  };
};

export const authFailure = error => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error
  };
};

export const setUserName = userName => {
  return {
    type: actionTypes.SET_USERNAME,
    userName: userName
  };
};

//login
export const auth = (email, password, login, history) => {
  return dispatch => {
    dispatch(authStart());
    let url = login
      ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}` // login path
      : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`; // create new account path
    axios
      .post(url, { email: email, password: password, returnSecureToken: true })
      .then(res => {
        login
          ? console.log("login statuscode: 200")
          : console.log("registration statuscode: 200");
        console.log(res);
        console.log(`expiresIn ${res.data.expiresIn}`);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuth(res.data.expiresIn));
        dispatch(setUserName(email));
        history.push("/");
      })
      .catch(err => {
        login ? console.log("login error") : console.log("registration error");
        console.log(err);
        console.log(err.response.data.error);
        dispatch(authFailure(err.response.data.error));
      });
  };
};

export const logout = () => ({
  type: actionTypes.LOGOUT
});

export const checkAuth = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000); //expirationTime seconds * 1000 miliseconds
    //30 seconds
  };
};
