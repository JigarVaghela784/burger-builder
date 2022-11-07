import React, { useState, useEffect } from "react";
import Order from "../Order/Order";
import axios from "../../axios-Order";
import WithErrorHandler from "../UI/hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
const Orders = ({ orders, loading, onFetchOrder }) => {
  useEffect(() => {
    onFetchOrder();

  }, [onFetchOrder]);

  let Orders = <Spinner/>;
  if (!loading) {
    console.log("loading", loading);

    Orders = orders.map((order) => (
      <Order key={order.id} price={order.price} ingredient={order.ingredient} />
    ));
    ////WithError handler reaming to add 
      /* <WithErrorHandler error={error} errorHandler={errorHandler} /> */
    
  }
  return <>{Orders}</>;
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.orderFetch()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
