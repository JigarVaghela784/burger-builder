import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = ({ ings, purchased }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const checkoutIngredients = new URLSearchParams(location.search);
  //   const ingredients = {};
  //   let price=0;
  //   for (let param of checkoutIngredients.entries()) {
  //     if(param[0]==='price'){
  //       price=param[1];
  //       console.log("price",price);
  //     }else{
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   setIngredient({ ingredients: ingredients,price });
  // }, [location.search]);
  const checkoutCancelledHandler = () => {
    navigate("/");
  };
  const checkoutContinuedHandler = () => {
    navigate("contact-data");
  };
      ////WithError handler reaming to add 

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
