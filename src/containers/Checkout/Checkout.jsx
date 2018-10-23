import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import axios from "../../axios-orders";
import withExceptionHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Route } from "react-router-dom";
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

  // checkoutHandler = () => {
  //   // this.setState({ modalState: "loading" });
  //   axios
  //     .post("/orders.json", {
  //       ingredients: this.state.ingredients,
  //       price: this.state.totalPrice.toFixed(2)
  //     })
  //     .then(res => {
  //       if (res) {
  //         console.log("response!");
  //         console.log(res);
  //         // this.setState({ modalState: "order_complete" });
  //       } else {
  //         // this.setState({ showModal: false, modalState: "order_summary" });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       // this.setState({ showModal: false, modalState: "order_summary" });
  //     });
  // };

  // componentDidMount() {

  //   //  EXTRACT INGREDIENTS FROM QUERY STRING
  //   const query = new URLSearchParams(this.props.location.search);
  //   let totalPrice;
  //   let ingredients = {};
  //   for (let i of query.entries()) {
  //     if (i[0] === "totalPrice") {
  //       totalPrice = i[1];
  //     } else ingredients[i[0]] = +i[1];
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  // }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          // clicked={this.cancelOrderHandler}
          cancelOrderHandler={this.cancelOrderHandler}
          checkoutContinueHandler={this.checkoutContinueHandler}
        />
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
  totalPrice: state.totalPrice,
  ingredients: state.ingredients
});

export default connect(mapStateToProps)(withExceptionHandler(Checkout, axios));
