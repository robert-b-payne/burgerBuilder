import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authLoading: false,
  error: null,
  data: null
};

const loginSuccess = (state, action) => {
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess();
    default:
      return state;
  }
};
