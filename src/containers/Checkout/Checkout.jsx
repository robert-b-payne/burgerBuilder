import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import axios from "../../axios-orders";
import withExceptionHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  cancelOrderHandler = () => {
    console.log("cancelOrderHandler!");
    console.log(this.props);
    this.props.history.push("/");
  };

  checkoutContinueHandler = () => {
    console.log("checkoutContinueHandler!");
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    let summary = this.props.ingredients ? (
      <CheckoutSummary
        ingredients={this.props.ingredients}
        // clicked={this.cancelOrderHandler}
        cancelOrderHandler={this.cancelOrderHandler}
        checkoutContinueHandler={this.checkoutContinueHandler}
      />
    ) : (
      <Redirect to="/" />
    );

    return (
      <div>
        {summary}
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.props.ingredients}
              totalPrice={this.props.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalPrice: state.burgerBuilder.totalPrice,
  ingredients: state.burgerBuilder.ingredients
});

export default connect(mapStateToProps)(withExceptionHandler(Checkout, axios));
