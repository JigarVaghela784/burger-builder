import React, { useState, useEffect } from "react";
import Order from "../Order/Order";
import axios from "../../axios-Order";
import WithErrorHandler from "../UI/hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
const Orders = ({ orders, loading, onFetchOrder, error }) => {
  useEffect(() => {
    onFetchOrder();
  }, [onFetchOrder]);


  let Orders = <Spinner />;
  if (!loading) {
    Orders = orders.map((order) => (
      <Order key={order.id} price={order.price} ingredient={order.ingredient} />
    ));
    ////WithError handler reaming to add
  }
  return (
    <>
      {Orders}
      <WithErrorHandler error={error}/>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
    error: state.order.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.orderFetch()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
