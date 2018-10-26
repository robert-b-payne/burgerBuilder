import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
// import Backdrop from "../../components/UI/Backdrop/Backdrop";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withExceptionHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./BurgerBuilder.css";
import { connect } from "react-redux";
// import * as actionTypes from "../../store/actions/actionsTypes";
import { BASE_PRICE } from "../../store/reducers/burgerBuilder";
import * as burgerBuilderActions from "../../store/actions/index";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: BASE_PRICE,
    // purchasable: false,
    showModal: false,
    modalState: "order_summary",
    //modalStates:
    // loading
    // order_complete
    // order_summary
    // ingredientsLoaded: false,
    // ingredientsLoaded: true, //temporarily set to true to bypass axios
    // loadIngredientsError: false    //moved to redux
    someState: 1
  };

  componentDidMount() {
    console.log("starting componentDidMount...");
    console.log(this.state.resetBurger);
    // axios
    //   .get("/ingredients.json")
    //   .then(res => {
    //     console.log("res.data: ");
    //     console.log(res.data);
    //     this.setState({ ingredients: res.data, ingredientsLoaded: true });
    //   })
    //   .catch(err => {
    //     console.log(err);ingredients: res.data, ingredientsLoaded: true
    //     this.setState({ loadIngredientsError: err.message });
    //   });
    // this.props.setIngredients({ salad: 0, bacon: 0, cheese: 0, meat: 0 });
    if (this.state.someState) {
      this.setState({ someState: 555 }, () => {
        console.log("someState: " + this.state.someState);
      });
    }
    if (this.props.resetBurger) {
      console.log("resetting burger . . .");
      this.props.initIngredients();
      this.props.resetPrice();
      this.props.setResetState(false);
      console.log("post reset state");
      console.log(this.props.resetBurger);
      console.log(this.props);
    }
    console.log("end of componentDidMount");
    console.log(this.props);
  }

  updatePurchaseState(updatedPrice) {
    return updatedPrice > BASE_PRICE;
  }

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice,
  //     purchasable: this.updatePurchaseState(updatedPrice)
  //   });
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) return;
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice,
  //     purchasable: this.updatePurchaseState(updatedPrice)
  //   });
  // };

  orderHandler = () => {
    this.setState({ showModal: true, modalState: "order_summary" });
  };

  backdropHandler = () => {
    console.log("backdrop handler!");
    this.setState({ showModal: false, order_complete: false, error: false });
  };

  checkoutHandler = () => {
    // this.setState({ modalState: "loading" });
    // axios
    //   .post("/orders.json", {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice.toFixed(2)
    //   })
    //   .then(res => {
    //     if (res) {
    //       console.log("response!!!!!!!!11111111111111");
    //       console.log(res);
    //       this.setState({ modalState: "order_complete" });
    //     } else {
    //       this.setState({ showModal: false, modalState: "order_summary" });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ showModal: false, modalState: "order_summary" });
    //   });
    // this.props.history.push("/checkout");
  };

  continueCheckoutHandler = () => {
    //    CREATE QUERY STRING TO PASS INGREDIENT INFORMATION TO /checkout ROUTE
    // let queryString = "?";
    // let queryArray = [];

    // for (let key in this.props.ingredients) {
    //   queryArray.push(
    //     encodeURIComponent(key) +
    //       "=" +
    //       encodeURIComponent(this.props.ingredients[key])
    //   );
    // }

    // queryString += queryArray.join("&");
    // queryString += "&totalPrice=" + this.props.totalPrice;

    console.log("continueCheckoutHandler!");
    console.log(this.props);
    this.props.history.push({
      pathname: "/checkout"
      // search: queryString
    });
  };

  // cancelOrderHandler = () => {
  //   this.props.history.push("/")
  // }

  render() {
    let modal_content;
    // console.log("this.props.error");
    // console.log(this.props.error);
    // if (this.props.error) {
    // console.log("error!!!!!");
    // modal_content = this.props.error;
    if (this.state.modalState === "loading") {
      modal_content = <Spinner />;
    } else if (this.state.modalState === "order_summary") {
      modal_content = (
        <OrderSummary
          ingredients={this.props.ingredients}
          // totalPrice={this.state.totalPrice}
          totalPrice={5} //temporarily hard coded
          backdropHandler={this.backdropHandler}
          continueCheckoutHandler={this.continueCheckoutHandler}
        />
      );
    } else if (this.state.modalState === "order_complete") {
      console.log("this.state.order_complete: ");
      console.log(this.state.order_complete);
      modal_content = <p>Your order has been placed!</p>;
    }

    let burger;
    if (this.props.ingredients) {
      burger = (
        <div>
          <div className={classes.BurgerContainer}>
            <Burger ingredients={this.props.ingredients} />
          </div>
          <BurgerControls
            addIngredientHandler={ingredientName =>
              this.props.addIngredientHandler(
                ingredientName,
                INGREDIENT_PRICES[ingredientName]
              )
            }
            removeIngredientHandler={ingredientName =>
              this.props.removeIngredientHandler(
                ingredientName,
                INGREDIENT_PRICES[ingredientName]
              )
            }
            ingredients={this.props.ingredients}
            totalPrice={this.props.totalPrice.toFixed(2)}
            purchasable={this.updatePurchaseState(this.props.totalPrice)}
            orderHandler={this.orderHandler}
          />
        </div>
      );
    } else if (this.props.loadIngredientsError) {
      burger = (
        <p style={{ textAlign: "center" }}>Could not load ingredients</p>
      );
    } else burger = <Spinner />;

    return (
      <React.Fragment>
        <Modal
          showModal={this.state.showModal}
          backdropHandler={this.backdropHandler}
        >
          {this.props.error ? this.props.error : modal_content}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  totalPrice: state.burgerBuilder.totalPrice,
  ingredients: state.burgerBuilder.ingredients,
  loadIngredientsError: state.burgerBuilder.loadIngredientsError,
  resetBurger: state.burgerBuilder.resetBurger
});

const mapDispatchToProps = dispatch => ({
  addIngredientHandler: (ingredientName, price) =>
    dispatch(burgerBuilderActions.addIngredient(ingredientName, price)),
  removeIngredientHandler: (ingredientName, price) =>
    dispatch(burgerBuilderActions.removeIngredient(ingredientName, price)),
  initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  resetPrice: () => dispatch(burgerBuilderActions.resetPrice()),
  setResetState: val => dispatch(burgerBuilderActions.setResetState(val))
});

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
//     }
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withExceptionHandler(BurgerBuilder, axios));
