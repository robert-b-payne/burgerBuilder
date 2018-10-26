//reducer
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  orderError: false,
  fetchError: null,
  orders: null,
  fetchOrdersLoading: true
};

const purchaseBurgerSuccess = (state, action) => {
  return {
    ...state,
    orderError: false
  };
};
const purchaseBurgerFailure = (state, action) => {
  return {
    ...state,
    orderError: true
  };
};

const setLoading = (state, action) => {
  return {
    ...state,
    loading: action.val
  };
};

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    fetchOrdersLoading: false
  };
};
const fetchOrdersFailure = (state, action) => {
  return {
    ...state,
    fetchError: action.error,
    fetchOrdersLoading: false
  };
};

const setFetchOrdersLoading = (state, action) => {
  return {
    ...state,
    fetchOrdersLoading: action.val
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FETCH_ORDERS_LOADING:
      return setFetchOrdersLoading(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILURE:
      return fetchOrdersFailure(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILURE:
      return purchaseBurgerFailure(state, action);
    case actionTypes.SET_LOADING:
      return setLoading(state, action);
    default:
      return state;
  }
};

export default reducer;
