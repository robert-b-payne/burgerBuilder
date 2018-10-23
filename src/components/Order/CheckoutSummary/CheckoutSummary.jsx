import React, { Component } from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

class CheckoutSummary extends Component {
  state = {};
  render() {
    return (
      <div className={classes.CheckoutSummary}>
        <h1>A Delicious Burger!</h1>
        <div style={{ width: "100%", margin: "auto" }}>
          <Burger ingredients={this.props.ingredients} />
        </div>
        <Button btnType="Danger" clicked={this.props.cancelOrderHandler}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.checkoutContinueHandler}>
          CONTINUE
        </Button>
      </div>
    );
  }
}

export default CheckoutSummary;
