import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/login" exact>
          Login
        </NavigationItem>
      ) : (
        <NavigationItem link="/logout" exact>
          Logout
        </NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
