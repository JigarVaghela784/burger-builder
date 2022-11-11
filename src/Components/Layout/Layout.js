import React, { useEffect, useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../header/Navigation/Toolbar";
import SideDrawer from "../header/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
const Layout = ({children,isAuthenticated}) => {
  const [sideDrawer, setSideDrawer] = useState({
    showSideDrawer: true,
  });
  const sideDrawerCloseHandler = () => {
    setSideDrawer({ showSideDrawer: false });
  };
  const sideDrawerToggleHandler = () => {
    setSideDrawer({ showSideDrawer: !sideDrawer.showSideDrawer });
  };
  useEffect(() => {
    setSideDrawer({ showSideDrawer: false });
  }, []);
  return (
    <>
      <SideDrawer isAuth={isAuthenticated}
        closed={sideDrawerCloseHandler}
        opened={sideDrawer.showSideDrawer}
      />
      <Toolbar isAuth={isAuthenticated} drawerToggleBtn={sideDrawerToggleHandler} />
      <main className={classes.content}>{children}</main>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
