import React from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
// import Spinner from "../Spinner/Spinner";

const modal = props => {
  // return props.showModal ? (
  //   <div className={classes.Modal}>{props.children}</div>
  // ) : null;
  return (
    <React.Fragment>
      <Backdrop
        show={props.showModal}
        backdropHandler={props.backdropHandler}
      />
      <div
        className={classes.Modal}
        style={{
          transform: props.showModal ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.showModal ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default modal;
