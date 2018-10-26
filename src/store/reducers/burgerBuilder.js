//reducer

import * as actionTypes from "../actions/actionTypes";

export const BASE_PRICE = 4;

const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  loadIngredientsError: false,
  resetBurger: true
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
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    loadIngredientsError: false
    // ingredientsLoaded: true
  };
};

const resetPrice = (state, action) => {
  console.log("resetting price . . .");
  return {
    ...state,
    totalPrice: BASE_PRICE
  };
};

const fetchIngredientsFailed = (state, action) => {
  return {
    ...state,
    loadIngredientsError: true
  };
};

const setResetState = (state, action) => {
  return {
    ...state,
    resetBurger: action.val
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
    case actionTypes.RESET_PRICE:
      return resetPrice(state, action);
    case actionTypes.SET_RESET_STATE:
      return setResetState(state, action);

    default:
      return state;
  }
};

export default reducer;
