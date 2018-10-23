import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import classes from "./Burger.css";

const burger = props => {
  let ingredientsArray = [];

  let noIngredients = true;
  let ingredients;

  for (let key in props.ingredients) {
    if (props.ingredients[key] > 0) {
      noIngredients = false;
      break;
    }
  }

  if (noIngredients) {
    console.log("no ingredients!");
    ingredients = <p>Please Add Ingredients!</p>;
  } else {
    console.log("ingredients present!");
    let index = 0;
    for (let key in props.ingredients) {
      for (let i = 0; i < props.ingredients[key]; i++) {
        ingredientsArray.push({ ingredient: key, key: index });
        index++;
      }
    }
    ingredients = ingredientsArray.map(x => (
      <BurgerIngredient type={x.ingredient} key={x.key} />
    ));
  }

  console.log(ingredients);
  //   console.log(ingredientsArray);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
