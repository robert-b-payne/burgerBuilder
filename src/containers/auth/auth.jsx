import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import checkValidity from "../../utility/checkValidity";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    controls: {
      email: {
        label: "Email",
        elementType: "input",
        elementConfig: {
          type: "Email",
          placeholder: "Email Address"
        },
        validation: {
          required: true,
          valid: false,
          rules: {
            isEmail: true
          }
        },
        value: "",
        touched: false
      },
      password: {
        label: "Password",
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        validation: {
          required: true,
          valid: false,
          rules: {
            minLength: 6
          }
        },
        value: "",
        touched: false
      }
    },
    formValid: false,
    loading: false,
    login: false
  };

  changeHandler = (event, id) => {
    // let updatedForm = { ...this.state.state.controls };
    // updatedForm[id].value = event.target.value;
    let updatedForm = JSON.parse(JSON.stringify(this.state.controls));
    updatedForm[id].value = event.target.value;

    if (checkValidity(updatedForm[id].value, updatedForm[id].validation)) {
      updatedForm[id].validation.valid = true;
    } else updatedForm[id].validation.valid = false;

    updatedForm[id].touched = true;

    // let updatedForm = { ...this.state.state.controls };
    // let nestedForm = { ...this.state.state.controls[id], value: event.target.value };
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

    this.setState({ controls: updatedForm, formValid: formValid_temp });
  };

  focusHandler = id => {
    console.log("focus handler called for " + id);
    // let objCopy = { ...this.state.orderForm };
    // let nestedObject = { ...objCopy[id] };
    // nestedObject.touched = true;
    // objCopy[id] = nestedObject;
    // this.setState({ orderForm: objCopy });
  };

  submitHandler = event => {
    console.log("submitHandler . . .");
    event.preventDefault();
    if (this.state.login) {
      this.props.login(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    } else {
      this.props.auth(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    }
  };

  changeState = () => {
    this.setState({ login: !this.state.login });
  };

  render() {
    let inputArray = [];
    for (let key in this.state.controls) {
      inputArray.push({ ...this.state.controls[key], id: key });
    }

    let inputComponentsArray = inputArray.map(x => {
      console.log("auth x!!!");
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
    return (
      <div className={classes.auth}>
        <form onSubmit={this.submitHandler}>
          {inputComponentsArray}
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            disabled={!this.state.formValid}
          >
            {this.state.login ? "Login" : "Create New Account"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.changeState}>
          Switch to {this.state.login ? "Create New Account" : "Login"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(actions.auth(email, password)),
  login: (email, password) => dispatch(actions.login(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
