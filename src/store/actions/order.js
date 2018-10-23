//actions

import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const order = () => ({
  type: actionTypes.ORDER
});

// Dispatching Asynchronous Actions
// A function that returns a function that dispatches
// Requires the “thunk” packages.
// const storeResult = result => {
// 	return (dispatch, getState) => {
// 		setTimeout(()=>{
// 			console.log( getState());
// 	dispatch(saveResult(res));
// }, 2000)
// 	}
// }
