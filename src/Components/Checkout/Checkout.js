import React, { useEffect } from "react";
import { connect } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = ({ ings }) => {
  
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
  console.log("location:", location);
  const checkoutCancelledHandler = () => {
    navigate("/");
  };
  const checkoutContinuedHandler = () => {
    navigate("contact-data");
  };
  return (
    <>
      <CheckoutSummary
        ingredients={ings}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      {location.pathname === "/checkout/contact-data" && <ContactData />}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};
export default connect(mapStateToProps)(Checkout);
