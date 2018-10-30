import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import checkValidity from "../../utility/checkValidity";

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
    formValid: false
  };

  changeHandler = (event, id) => {
    // let updatedForm = { ...this.state.state.controls };
    // updatedForm[id].value = event.target.value;
    let updatedForm = JSON.parse(JSON.stringify(this.state.controls));
    updatedForm[id].value = event.target.value;

    if (this.checkValidity(updatedForm[id].value, updatedForm[id].validation)) {
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

    // let objCopy = JSON.parse(JSON.stringify(this.state.state.controls));
    // if (updatedForm[id].touched) {
    //   if (
    //     !this.checkValidity(
    //       updatedForm[id].value,
    //       updatedForm[id].validation
    //     )
    //   ) {
    //     updatedForm[id].validation.valid = true;
    //   } else objCopy[id].validation.valid = false;
    //   this.setState({ state.controls: objCopy });
    // }

    // this.setState({ state.controls: updatedForm });
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
      <div>
        <form />
      </div>
    );
  }
}

export default Auth;
