import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
const sideDrawer = props => {
  console.log("inside sideDrawer: ");
  console.log(props);
  return (
    <React.Fragment>
      <Backdrop
        backdropHandler={props.sideDrawerClosedHandler}
        show={props.drawerOpen}
      />
      <div
        className={[
          classes.SideDrawer,
          props.drawerOpen ? classes.Open : classes.Close
        ].join(" ")}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
