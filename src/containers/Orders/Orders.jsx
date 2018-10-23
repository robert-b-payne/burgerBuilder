import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = { loading: false };
  componentDidMount() {
    console.log("Orders mounted!");
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then(res => {
        this.setState({ data: res.data });
        this.setState({ loading: false });
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    let ordersArray = [];
    console.log("rendering Orders!");
    // console.log(this.state.data);
    if (this.state.data) {
      for (let key in this.state.data) {
        ordersArray.push({
          key: key,
          ingredients: this.state.data[key]["ingredients"],
          price: this.state.data[key]["price"]
        });
      }
    }
    console.log("ordersArray");
    console.log(ordersArray);

    let orders = ordersArray.map(x => {
      return <Order key={x.key} ingredients={x.ingredients} price={x.price} />;
    });

    return this.state.loading ? (
      <Spinner />
    ) : (
      <div> {this.state.data ? orders : null}</div>
    );
  }
}

export default withErrorHandler(Orders, axios);
