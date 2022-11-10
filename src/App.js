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
  }, [onAuthCheck]);

  let routes = (
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="/" element={<BurgerBuilder />} />
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
  if (isAuthenticated) {
     routes = (
      <Routes>
        <Route path="/checkout" element={<Checkout />}>
          <Route path="contact-data" element={<ContactData />} />
        </Route>
        <Route path="orders" element={<Orders />} />
        <Route path="auth" element={<Auth />} />
        <Route path="logout" element={<Logout />} />
        <Route path="/" element={<BurgerBuilder />} />
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    );
  }
  return (
    <>
      <Layout>
        {routes}
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
