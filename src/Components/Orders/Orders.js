import React, { useEffect } from "react";
import Order from "../Order/Order";
import WithErrorHandler from "../UI/hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
const Orders = ({ orders, loading, onFetchOrder, error, token,userId }) => {
  useEffect(() => {
    onFetchOrder(token,userId);
  }, [onFetchOrder, token,userId]);

  let Orders = <Spinner />;
  if (!loading) {
    Orders = orders.map((order) => (
      <Order key={order.id} price={order.price} ingredient={order.ingredient} />
    ));
  }
  let errorMessage = null;
  if (error) {
    errorMessage = <WithErrorHandler error={error} />;
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
    error: state.order.orderError,
    token: state.auth.token,
    userId:state.auth.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token,userId) => dispatch(actions.orderFetch(token,userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
