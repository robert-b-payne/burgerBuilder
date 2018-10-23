//reducer

import * as actionTypes from "../actions/actionTypes";

export const BASE_PRICE = 4;

const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  loadIngredientsError: false
  // ingredientsLoaded: falsesf
};

const addIngredient = (state, action) => {
  return {
    ...state,
    totalPrice: state.totalPrice + action.price,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
  };
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    totalPrice: state.totalPrice - action.price,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }
  };
};

const setIngredients = (state, action) => {
  console.log("setIngredients action dispatched!");
  return {
    ...state,
    ingredients: action.ingredients
    // ingredientsLoaded: true
  };
};

const fetchIngredientsFailed = (state, action) => {
  return {
    ...state,
    loadIngredientsError: false
  };
};

// export const SET_INGREDIENTS = "SET_INGREDIENTS";
// export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";
// export const INIT_INGREDIENTS = "INIT_INGREDIENTS";

const reducer = (state = initialState, action) => {
  console.log("price");
  console.log(action.price);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
