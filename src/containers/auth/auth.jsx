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
          },
          errorMessage: "Must be a valid email address"
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
          },
          errorMessage: "Password must be at least 6 characters"
        },
        value: "",
        touched: false
      },
      confirmPassword: {
        label: "Confirm Password",
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        validation: {
          required: false,
          valid: false,
          rules: {
            confirmPassword: true
          },
          errorMessage: "Passwords must match"
        },
        value: "",
        touched: false
      }
    },
    formValid: false,
    loading: false,
    login: true,
    registrationMode: false
  };

  validateForm = (updatedForm, id) => {
    let otherPassword =
      id === "confirmPassword" ? updatedForm["password"].value : null;

    if (
      checkValidity(
        updatedForm[id].value,
        updatedForm[id].validation,
        otherPassword
      )
    ) {
      updatedForm[id].validation.valid = true;
    } else updatedForm[id].validation.valid = false;

    // let updatedForm = { ...this.state.state.controls };
    // let nestedForm = { ...this.state.state.controls[id], value: event.target.value };
    // updatedForm[id] = nestedForm;

    //set formValid
    let formValid_temp = true;
    for (let key in updatedForm) {
      console.log("form");
      console.log(updatedForm[key].validation);
      if (
        updatedForm[key].validation.required &&
        !updatedForm[key].validation.valid
      ) {
        formValid_temp = false;
        break;
      }
    }

    this.setState({ controls: updatedForm, formValid: formValid_temp });
    if (id === "password") this.validateForm(updatedForm, "confirmPassword");
  };

  changeHandler = (event, id) => {
    // debugger;
    // let updatedForm = { ...this.state.state.controls };
    // updatedForm[id].value = event.target.value;
    let updatedForm = JSON.parse(JSON.stringify(this.state.controls));
    updatedForm[id].value = event.target.value;
    updatedForm[id].touched = true;

    // if (!this.state.registrationMode) {
    //   updatedForm.confirmPassword.validation.required = false;
    // } else updatedForm.confirmPassword.validation.required = true;

    //other password is used in checking if two password fields match in new account creation

    this.validateForm(updatedForm, id);

    // let otherPassword =
    //   id === "confirmPassword" ? updatedForm["password"].value : null;

    // if (
    //   checkValidity(
    //     updatedForm[id].value,
    //     updatedForm[id].validation,
    //     otherPassword
    //   )
    // ) {
    //   updatedForm[id].validation.valid = true;
    // } else updatedForm[id].validation.valid = false;

    // updatedForm[id].touched = true;

    // // let updatedForm = { ...this.state.state.controls };
    // // let nestedForm = { ...this.state.state.controls[id], value: event.target.value };
    // // updatedForm[id] = nestedForm;

    // //set formValid
    // let formValid_temp = true;
    // for (let key in updatedForm) {
    //   console.log("form");
    //   console.log(updatedForm[key].validation);
    //   if (
    //     updatedForm[key].validation.required &&
    //     !updatedForm[key].validation.valid
    //   ) {
    //     formValid_temp = false;
    //     break;
    //   }
    // }

    // this.setState({ controls: updatedForm, formValid: formValid_temp });
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
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.login,
      this.props.history
    );
  };

  changeState = () => {
    let updatedForm = JSON.parse(JSON.stringify(this.state.controls));

    if (this.state.registrationMode) {
      updatedForm.confirmPassword.validation.required = false;
    } else updatedForm.confirmPassword.validation.required = true;

    this.validateForm(updatedForm, "confirmPassword");

    this.setState({
      login: !this.state.login,
      registrationMode: !this.state.registrationMode,
      controls: updatedForm
    });
  };

  render() {
    let inputArray = [];
    for (let key in this.state.controls) {
      if (key !== "confirmPassword" || this.state.registrationMode)
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
    let formContent = this.props.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        {" "}
        {inputComponentsArray}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formValid}
        >
          {this.state.login ? "Login" : "Create New Account"}
        </Button>{" "}
      </React.Fragment>
    );
    let errorMessage = (
      <p style={{ color: "red" }}>
        {this.props.error ? this.props.error.message : null}
      </p>
    );

    return (
      <div className={classes.auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>{formContent}</form>
        <br />
        <br />
        <Button btnType="Danger" clicked={this.changeState}>
          Switch to {this.state.login ? "Create New Account" : "Login"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.authLoading
});

const mapDispatchToProps = dispatch => ({
  auth: (email, password, login, history) =>
    dispatch(actions.auth(email, password, login, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
