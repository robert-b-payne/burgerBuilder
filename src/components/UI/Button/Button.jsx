import React from "react";
import classes from "./Button.css";

const button = props => {
  let classArray = [classes.Button, classes[props.btnType]];
  if (props.disabled) classArray.push(classes.Disabled);
  let classList = classArray.join(" ");
  return (
    <button
      onClick={props.clicked}
      className={classList}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
