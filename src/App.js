import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Components/BurgerBuilder/BurgerBuilder";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactData from "./Components/Checkout/ContactData/ContactData";
import Logout from "./Components/Auth/Logout/Logout";
import * as actions from "./store/action/index";
import { connect } from "react-redux";

function App({ onAuthCheck, isAuthenticated }) {
  useEffect(() => {
    onAuthCheck();
  }, [onAuthCheck]);

  const LazyCheckout = lazy(() => import("./Components/Checkout/Checkout"));
  const LazyOrders = lazy(() => import("./Components/Orders/Orders"));
  const LazyAuth = lazy(() => import("./Components/Auth/Auth"));

  let routes = (
    <Routes>
      <Route
        path="auth"
        element={
          <Suspense fallback="Loading...">
            <LazyAuth />
          </Suspense>
        }
      />
      <Route path="/" element={<BurgerBuilder />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route
          path="/checkout"
          element={
            <Suspense fallback="Loading...">
              <LazyCheckout />
            </Suspense>
          }
        >
          <Route path="contact-data" element={<ContactData />} />
        </Route>
        <Route
          path="orders"
          element={
            <Suspense fallback="Loading...">
              <LazyOrders />
            </Suspense>
          }
        />
        <Route
          path="auth"
          element={
            <Suspense fallback="Loading...">
              <LazyAuth />
            </Suspense>
          }
        />
        <Route path="logout" element={<Logout />} />
        <Route path="/" element={<BurgerBuilder />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <>
      <Layout>{routes}</Layout>
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
