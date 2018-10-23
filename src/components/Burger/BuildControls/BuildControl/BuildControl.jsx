import React from "react";
import classes from "./BuildControl.css";

const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removeIngredientHandler}
        disabled={!props.ingredients}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addIngredientHandler}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
