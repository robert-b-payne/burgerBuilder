import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  // state = { loading: false };
  componentDidMount() {
    console.log("Orders mounted!");
    // this.setState({ loading: true });
    // axios
    //   .get("/orders.json")
    //   .then(res => {
    //     this.setState({ data: res.data });
    //     this.setState({ loading: false });
    //     // console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ loading: false });
    //   });
    this.props.fetchOrders();
  }

  render() {
    let ordersArray = [];
    console.log("rendering Orders!");
    // console.log(this.state.data);
    if (this.props.orders) {
      for (let key in this.props.orders) {
        ordersArray.push({
          key: key,
          ingredients: this.props.orders[key]["ingredients"],
          price: this.props.orders[key]["price"]
        });
      }
    }
    console.log("ordersArray");
    console.log(ordersArray);

    let orders = ordersArray.map(x => {
      return <Order key={x.key} ingredients={x.ingredients} price={x.price} />;
    });

    return this.props.loading ? (
      <Spinner />
    ) : (
      <div> {this.props.orders ? orders : null}</div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.order.fetchError,
  orders: state.order.orders,
  loading: state.order.fetchOrdersLoading
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
