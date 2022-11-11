import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = ({ ings, purchased }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutCancelledHandler = () => {
    navigate("/");
  };
  const checkoutContinuedHandler = () => {
    navigate("contact-data");
  };

  let summary = <Navigate to="/" />;
  if (ings) {
    const purchasedInit = purchased ? <Navigate to="/" /> : null;
    summary = (
      <>
        {purchasedInit}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        {location.pathname === "/checkout/contact-data" && <ContactData />}
      </>
    );
  }
  return summary;
};
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};
export default connect(mapStateToProps)(Checkout);
