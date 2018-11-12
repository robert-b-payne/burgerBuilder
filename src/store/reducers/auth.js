import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authLoading: false,
  error: null,
  data: null,
  idToken: null,
  localId: null,
  lastActivity: null,
  expirationTime: null,
  userName: null
};

const authSuccess = (state, action) => {
  console.log("authSuccess inside authReducer . . . . . . .");
  console.log("action: " + action);
  let currentTime = new Date().getTime();
  return {
    ...state,
    idToken: action.idToken,
    localId: action.localId,
    lastActivity: currentTime,
    expirationTime: currentTime + 1000 * 60 * 60,
    authLoading: false
  };
};

const authFailure = (state, action) => {
  console.log("authFailure inside authReducer . . . ");
  console.log("action: ");
  console.log(action);
  return {
    ...state,
    error: action.error,
    authLoading: false
  };
};

const authStart = (state, action) => ({
  ...state,
  authLoading: true,
  error: null
});

const logout = (state, action) => ({
  ...state,
  idToken: null,
  localId: null
});

const setUserName = (state, action) => ({
  ...state,
  userName: action.userName
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE:
      return authFailure(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    case actionTypes.SET_USERNAME:
      return setUserName(state, action);
    default:
      return state;
  }
};

export default reducer;
