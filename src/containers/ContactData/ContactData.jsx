import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
// import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
// import order from "../../components/Order/Order";
import * as orderActions from "../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        label: "Name",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        validation: {
          required: true,
          valid: false,
          rules: {
            minLength: 3,
            maxLength: 10
          }
        },
        value: "",
        touched: false
      },
      street: {
        label: "Street",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          valid: false,
          rules: {
            minLength: 5,
            maxLength: 15
          }
        }
      },
      zipcode: {
        label: "Zipcode",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zipcode"
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          rules: {
            length: 5
          }
        },
        touched: false
      },
      country: {
        label: "Country",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          rules: {
            minLength: 3,
            maxLength: 12
          }
        },
        touched: false
      },
      email: {
        label: "Email",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          rules: {
            minLength: 3,
            maxLength: 15
          }
        },
        touched: false
      },
      deliveryMethod: {
        label: "Delivery Method",
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "economy", displayValue: "Economy" },
            { value: "superSaver", displayValue: "Super Saver" }
          ]
        },
        value: "economy",
        validation: {
          required: false,
          valid: true,
          rules: {}
        },
        touched: false
      }
    },
    // loading: false,
    formValid: false
  };

  componentDidMount() {
    console.log("ContactData mounted!");
    console.log(this.props.ingredients);
    console.log(parseFloat(this.props.totalPrice).toFixed(2));
  }

  checkValidity = (value, validation) => {
    if (validation.required) {
      for (let key in validation.rules) {
        switch (key) {
          case "minLength":
            if (value.length < validation.rules.minLength) return false;
            break;
          case "maxLength":
            if (value.length > validation.rules.maxLength) return false;
            break;
          case "length":
            if (value.length !== validation.rules.length) return false;
            break;
          default:
            return false;
        }
      }
    }
    return true;
  };

  orderHandler = event => {
    // this.setState({ modalState: "loading" });
    event.preventDefault();
    //validate all inputs
    // let objectCopy = JSON.parse(JSON.stringify(this.state.orderForm));
    // let formValid = true;
    // for (let key in this.state.orderForm) {
    //   if (
    //     this.state.orderForm[key].validation.required &&
    //     !this.checkValidity(
    //       this.state.orderForm[key].value,
    //       this.state.orderForm[key].validation
    //     )
    //   ) {
    //     objectCopy[key].validation.valid = false;
    //     formValid = false;
    //   } else objectCopy[key].validation.valid = true;
    //   objectCopy[key].touched = true;
    // }
    // this.setState({ orderForm: objectCopy });
    // if (!formValid) return;

    //   if (
    //     this.checkValidity(
    //       this.state.orderForm[key].value,
    //       this.state.orderForm[key].validation
    //     )
    //   ) {
    //     this.state.orderForm[key].validation.valid = true;
    //   } else {
    //     this.state.orderForm[key].validation.valid = false;
    //   }
    // }

    // this.setState({ loading: true });
    const orderForm = {};
    for (let key in this.state.orderForm) {
      orderForm[key] = this.state.orderForm[key].value;
    }
    console.log("orderHandler!111111");
    // this.props.setResetState(true);
    this.props.submitOrder(
      this.props.ingredients,
      this.props.price,
      orderForm,
      this.props.history
    );
    // this.setState({ loading: false });
    // this.props.setResetState(true);

    // axios
    //   .post("/orders.json", {
    //     ingredients: this.props.ingredients,
    //     price: parseFloat(this.props.totalPrice).toFixed(2),
    //     order_info: orderForm
    //   })
    //   .then(res => {
    //     if (res) {
    //       console.log("response!");
    //       console.log(res);
    //       this.setState({ loading: false });
    //       this.props.history.push("/");
    //       // this.setState({ modalState: "order_complete" });
    //     } else {
    //       // this.setState({ showModal: false, modalState: "order_summary" });
    //       this.setState({ loading: false });
    //       this.props.history.push("/");
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     // this.setState({ showModal: false, modalState: "order_summary" });
    //   });
  };

  changeHandler = (event, id) => {
    // let updatedForm = { ...this.state.orderForm };
    // updatedForm[id].value = event.target.value;
    let updatedForm = JSON.parse(JSON.stringify(this.state.orderForm));
    updatedForm[id].value = event.target.value;

    if (this.checkValidity(updatedForm[id].value, updatedForm[id].validation)) {
      updatedForm[id].validation.valid = true;
    } else updatedForm[id].validation.valid = false;

    updatedForm[id].touched = true;

    // let updatedForm = { ...this.state.orderForm };
    // let nestedForm = { ...this.state.orderForm[id], value: event.target.value };
    // updatedForm[id] = nestedForm;

    //set formValid
    let formValid_temp = true;
    for (let key in updatedForm) {
      if (
        updatedForm[key].validation.required &&
        !updatedForm[key].validation.valid
      ) {
        formValid_temp = false;
        break;
      }
    }

    this.setState({ orderForm: updatedForm, formValid: formValid_temp });

    // let objCopy = JSON.parse(JSON.stringify(this.state.orderForm));
    // if (updatedForm[id].touched) {
    //   if (
    //     !this.checkValidity(
    //       updatedForm[id].value,
    //       updatedForm[id].validation
    //     )
    //   ) {
    //     updatedForm[id].validation.valid = true;
    //   } else objCopy[id].validation.valid = false;
    //   this.setState({ orderForm: objCopy });
    // }

    // this.setState({ orderForm: updatedForm });
  };

  focusHandler = id => {
    console.log("focus handler called for " + id);
    // let objCopy = { ...this.state.orderForm };
    // let nestedObject = { ...objCopy[id] };
    // nestedObject.touched = true;
    // objCopy[id] = nestedObject;
    // this.setState({ orderForm: objCopy });
  };

  render() {
    let inputArray = [];
    for (let key in this.state.orderForm) {
      inputArray.push({ ...this.state.orderForm[key], id: key });
    }

    console.log("inputArray: " + inputArray);

    let inputComponentsArray = inputArray.map(x => {
      console.log("x!!!");
      console.log(x);
      return (
        <Input
          // {...x.elementConfig}
          // key={x.id}
          // value={x.value}
          // inputtype={x.elementType}
          // Label={x.id}
          changeHandler={event => this.changeHandler(event, x.id)}
          {...x}
          focusHandler={() => this.focusHandler(x.id)}
          key={x.id}
        />
      );
    });

    console.log("inputComponentsArray: ");
    console.log(inputComponentsArray);

    let form = this.props.loading ? (
      <Spinner />
    ) : (
      <form>
        {/* <Input inputtype="input" name="name" placeholder="Your name" />
        <Input inputtype="input" name="email" placeholder="Your email" />
        <Input inputtype="input" name="street" placeholder="Street" />
        <Input inputtype="input" name="zipcode" placeholder="Zipcode" /> */}
        {inputComponentsArray}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formValid}
        >
          ORDER
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Information</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // loading: state.order.loading,
  orderError: state.orderError,
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  submitOrder: (ingredients, price, orderForm, history) =>
    dispatch(orderActions.submitOrder(ingredients, price, orderForm, history)),
  setResetState: val => dispatch(orderActions.setResetState(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactData);
