//actions

import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredientName, price) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    price: price,
    ingredientName: ingredientName
  };
};

export const removeIngredient = (ingredientName, price) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName,
    price: price
  };
};

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
});

export const resetPrice = price => ({
  type: actionTypes.RESET_PRICE
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  console.log("fetching ingredients...");
  return dispatch => {
    console.log("async action dispatched!");
    axios
      .get("/ingredients.json")
      .then(res => {
        console.log("ingredients fetched!");
        console.log("res.data: ");
        console.log(res.data);
        // this.setState({ ingredients: res.data, ingredientsLoaded: true });
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        console.log("failed to fetch ingredients!");
        console.log(err);
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const setResetState = val => {
  return { type: actionTypes.SET_RESET_STATE, val: val };
};

// export const initIngredients = () => {
//   return dispatch => {
//     console.log("async action dispatched!");
//     axios
//       .get("https://react-my-burger.firebaseio.com/ingredients.json")
//       .then(response => {
//         dispatch(setIngredients(response.data));
//       })
//       .catch(error => {
//         dispatch(fetchIngredientsFailed());
//       });
//   };
// };
