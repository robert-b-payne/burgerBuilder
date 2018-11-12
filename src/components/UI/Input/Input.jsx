import React from "react";
import classes from "./Input.css";

const input = props => {
  let inputElement = null;

  console.log("rendering component!");
  console.log(props);
  console.log("props.validation.valid: " + props.validation.valid);
  //   let validStyle =
  //     !props.validation.valid && props.touched
  //       ? { backgroundColor: "red" }
  //       : null;
  //   console.log("validStyle: " + validStyle);
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
          //   style={validStyle}
          onFocus={props.focusHandler}
        />
      );
      break;
    case "text-area":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
          //   style={validStyle}
          onFocus={props.focusHandler}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changeHandler}
        >
          {props.elementConfig.options.map(x => {
            return (
              <option key={x.value} value={x.value}>
                {x.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
          //   style={validStyle}
          onFocus={props.focusHandler}
        />
      );
  }

  // let rules = [];
  // for (let key in props.validation.rules) {
  //   rules.push(
  //     <span style={{ color: "red", marginLeft: "5px" }}>
  //       {key}: {props.validation.rules[key]}
  //     </span>
  //   );
  // }

  let errorMessage = (
    <span style={{ color: "red", marginLeft: "5px" }}>
      {props.validation.errorMessage}
    </span>
  );

  let validationSymbol;
  if (props.touched) {
    validationSymbol = props.validation.valid ? (
      <span className={classes.ValidationSymbol} style={{ color: "green" }}>
        &#x2714;
      </span>
    ) : (
      <span className={classes.ValidationSymbol} style={{ color: "red" }}>
        &#x2715;
      </span>
    );
  } else validationSymbol = null;

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {!props.validation.valid && props.touched ? errorMessage : null}
      <div style={{ position: "relative" }}>
        {inputElement}
        {props.elementType !== "select" ? validationSymbol : null}
      </div>
    </div>
  );
};

export default input;
