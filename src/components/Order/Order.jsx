import React from "react";
import classes from "./Order.css";

const order = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    if (parseInt(props.ingredients[key], 10) > 0) {
      ingredients.push(
        <p style={{ textTransform: "capitalize" }}>
          {key}: {props.ingredients[key]}
        </p>
      );
    }
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      {ingredients}
      <p>
        Price: <strong>${props.price}</strong>
      </p>
    </div>
  );
};

export default order;
