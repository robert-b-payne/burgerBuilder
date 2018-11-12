import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

// const controls = [
//   { label: "Salad", type: "salad" },
//   { label: "Bacon", type: "bacon" },
//   { label: "Cheese", type: "cheese" },
//   { label: "Meat", type: "meat" }
// ];

const buildControls = props => {
  console.log("-============inside build controls============-");
  console.log(props.ingredients);
  let controlElement = [];

  // controls.map(x => {
  //   controlElement.push(
  //     props.ingredients ? (
  //       <BuildControl
  //         label={x.label}
  //         key={x.label}
  //         addIngredientHandler={() => props.addIngredientHandler(x.type)}
  //         removeIngredientHandler={() => props.removeIngredientHandler(x.type)}
  //         ingredients={props.ingredients[x.type]}
  //       />
  //     ) : null
  //   );
  // });

  for (let k in props.ingredients) {
    controlElement.push(
      props.ingredients ? (
        <BuildControl
          label={k.charAt(0).toUpperCase() + k.substring(1)}
          key={k}
          addIngredientHandler={() => props.addIngredientHandler(k)}
          removeIngredientHandler={() => props.removeIngredientHandler(k)}
          ingredients={props.ingredients[k]}
        />
      ) : null
    );
  }

  console.log("BURGER CONTROLS:");
  console.log(props.totalPrice);

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.totalPrice}</strong>
      </p>
      {controlElement}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.orderHandler}
      >
        {props.isAuthenticated ? "ORDER NOW" : "LOGIN TO ORDER"}
      </button>
    </div>
  );
};

export default buildControls;
