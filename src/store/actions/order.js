import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { setResetState } from "./index";

//actions

const purchaseBurgerSuccess = () => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS
});
const purchaseBurgerFailure = () => ({
  type: actionTypes.PURCHASE_BURGER_FAILURE
});

export const setLoading = val => ({
  type: actionTypes.SET_LOADING,
  val: val
});

export const submitOrder = (
  ingredients,
  price,
  orderForm,
  history,
  idToken,
  userName
) => {
  console.log("submitOrder dispatched!");

  return dispatch => {
    dispatch(setLoading(true));
    console.log("submitOrder . . . ! ! !");
    console.log("idToken:");
    console.log(idToken);
    axios
      .post(`/orders.json?auth=${idToken}`, {
        ingredients: ingredients,
        price: parseFloat(price).toFixed(2),
        order_info: orderForm,
        date: new Date().toString(),
        userName: userName
      })
      .then(res => {
        if (res) {
          console.log("submitOrder async dispatched . . . success!");
          console.log("response!");
          console.log(res);
          dispatch(purchaseBurgerSuccess());
          dispatch(setResetState(true));
          console.log("history: ");
          console.log(history);
          history.push("/");
          dispatch(setLoading(false));
        }
      })
      .catch(error => {
        console.log("submitOrder async dispatch succeeded with error!");
        console.log(error);
        dispatch(purchaseBurgerFailure());
        dispatch(setLoading(false));
      });
  };
};

const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});
const fetchOrdersFailure = error => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  error: error
});

export const fetchOrders = token => {
  return dispatch => {
    console.log("fetchOrders: ");
    console.log("idToken: ");
    console.log(token);
    dispatch(setFetchOrdersLoading(true));
    axios
      .get("/orders.json?auth=" + token)
      .then(res => {
        console.log("fetchOrders async dispatched successfully!");
        console.log("response!");
        console.log(res);
        dispatch(fetchOrdersSuccess(res.data));
        dispatch(setFetchOrdersLoading(false));
      })
      .catch(error => {
        console.log("submitOrder async dispatch succeeded with error!");
        console.log(error);
        dispatch(fetchOrdersFailure(error));
        dispatch(setFetchOrdersLoading(false));
      });
  };
};

export const setFetchOrdersLoading = val => ({
  type: actionTypes.SET_FETCH_ORDERS_LOADING,
  val: val
});
