import React, { Component } from "react";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = { drawerOpen: false };
  sideDrawerClosedHandler = () => {
    console.log("drawerOpen handler!");
    if (this.state.drawerOpen) {
      this.setState({ drawerOpen: false });
    }
  };
  toggleHandler = () => {
    console.log("toggleHandler called!");
    this.setState({ drawerOpen: true });
  };
  render() {
    return (
      <React.Fragment>
        <Toolbar toggleHandler={this.toggleHandler} />
        <SideDrawer
          sideDrawerClosedHandler={this.sideDrawerClosedHandler}
          drawerOpen={this.state.drawerOpen}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
