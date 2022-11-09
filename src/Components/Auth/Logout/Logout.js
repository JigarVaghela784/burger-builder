import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import * as actions from "../../../store/action/index";
const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [ onLogout]);

  return <Navigate to="/" />
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
