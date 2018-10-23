import React from "react";
// import classes from "../../UI/Button/Button.css";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  console.log("preparing order summary . . . ");
  let list = [];
  let index = 0;
  for (let k in props.ingredients) {
    console.log("inside k in obj loop");
    list.push(
      <li key={index}>
        {k.charAt(0).toUpperCase() +
          k.substring(1) +
          ": " +
          props.ingredients[k]}
      </li>
    );
    index++;
  }
  console.log("list: ");
  console.log(list);
  return (
    <React.Fragment>
      <p>
        <strong>Order summary:</strong>
      </p>
      <ul>{list}</ul>
      <p>
        <strong>Price: ${props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.backdropHandler} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.continueCheckoutHandler} btnType="Success">
        Checkout
      </Button>
    </React.Fragment>
  );
};

export default orderSummary;
