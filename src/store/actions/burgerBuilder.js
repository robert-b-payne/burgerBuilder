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

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  console.log("fetching ingredients...");
  return dispatch => {
    // axios
    //   .get("/ingredients.json")
    //   .then(res => {
    //     console.log("ingredients fetched!");
    //     console.log("res.data: ");
    //     console.log(res.data);
    //     // this.setState({ ingredients: res.data, ingredientsLoaded: true });
    //     dispatch(setIngredients(res.data));
    //   })
    //   .catch(err => {
    //     console.log("failed to fetch ingredients!");
    //     console.log(err);
    //     dispatch(fetchIngredientsFailed());
    //   });
    console.log("dispatch called");
    dispatch(setIngredients({ salad: 0, bacon: 0, cheese: 0, meat: 0 }));

    // setTimeout(() => {
    //   console.log("setting ingredients!");
    //   dispatch(setIngredients({ salad: 0, bacon: 0, cheese: 0, meat: 0 }));
    // }, 3000);
  };
};
