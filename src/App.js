import React, { useEffect } from "react";
import "./App.css";
// import RouteList from "./RouteList";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Components/BurgerBuilder/BurgerBuilder";
import Checkout from "./Components/Checkout/Checkout";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactData from "./Components/Checkout/ContactData/ContactData";
import Orders from "./Components/Orders/Orders";
import Auth from "./Components/Auth/Auth";
import Logout from "./Components/Auth/Logout/Logout";
import * as actions from "./store/action/index";
import { connect } from "react-redux";

function App({ onAuthCheck, isAuthenticated }) {
  useEffect(() => {
    onAuthCheck();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/checkout" element={<Checkout />}>
            <Route path="contact-data" element={<ContactData />} />
          </Route>
          <Route path="orders" element={<Orders />} />
          <Route path="auth" element={<Auth />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/" element={<BurgerBuilder />} />
        </Routes>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
