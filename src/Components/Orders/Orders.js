import React, { useState, useEffect } from "react";
import Order from "../Order/Order";
import axios from "../../axios-Order";
import WithErrorHandler from "../UI/hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
const Orders = ({ orders, loading, onFetchOrder, error,token }) => {
  console.log('token1234', token)
  useEffect(() => {
    onFetchOrder(token);
  }, [onFetchOrder,token]);

  let Orders = <Spinner />;
  if (!loading) {
    Orders = orders.map((order) => (
      <Order key={order.id} price={order.price} ingredient={order.ingredient} />
    ));
  }
  let errorMessage=null;
  if(error){
    <WithErrorHandler error={error}/>
  }
  return (
    <>
      {Orders}
      {errorMessage}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
    error: state.order.error,
    token:state.auth.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token) => dispatch(actions.orderFetch(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
