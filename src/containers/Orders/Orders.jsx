import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

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
    // if (!this.props.isAuthenticated) this.props.history.push("/");
    this.props.fetchOrders(this.props.idToken);
  }

  render() {
    let ordersArray = [];
    console.log("rendering Orders!");
    // console.log(this.state.data);
    console.log("this.props.orders");
    console.log(this.props.orders);
    if (this.props.orders) {
      for (let key in this.props.orders) {
        if (this.props.orders[key].userName === this.props.userName) {
          ordersArray.push({
            date: this.props.orders[key].date,
            key: key,
            ingredients: this.props.orders[key]["ingredients"],
            price: this.props.orders[key]["price"]
          });
        }
      }
    }
    console.log("ordersArray");
    console.log(ordersArray);

    let orders = ordersArray.map(x => {
      return (
        <Order
          key={x.key}
          ingredients={x.ingredients}
          price={x.price}
          date={x.date}
        />
      );
    });

    let authRedirect = this.props.isAuthenticated ? null : <Redirect to="/" />;

    let ordersContent = this.props.loading ? (
      <Spinner />
    ) : (
      <div> {this.props.orders ? orders : null}</div>
    );

    return (
      <React.Fragment>
        {authRedirect}

        <p style={{ textAlign: "center" }}>
          Order history for {this.props.userName}
        </p>
        {ordersContent}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.order.fetchError,
  orders: state.order.orders,
  loading: state.order.fetchOrdersLoading,
  idToken: state.auth.idToken,
  isAuthenticated: state.auth.idToken !== null,
  userName: state.auth.userName
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: idToken => dispatch(actions.fetchOrders(idToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
