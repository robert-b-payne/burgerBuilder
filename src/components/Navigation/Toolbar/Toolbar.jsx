import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <ToggleButton toggleHandler={props.toggleHandler} />
      <div>MENU</div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
