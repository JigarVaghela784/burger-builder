import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  const [ingredient, setIngredient] = useState({
     ingredients: {
      cheese: 0,
      bacon: 0,
      meat: 0,
      salad: 0,
    },
    price:0,
  });
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const checkoutIngredients = new URLSearchParams(location.search);
    const ingredients = {};
    let price=0;
    for (let param of checkoutIngredients.entries()) {
      if(param[0]==='price'){
        price=param[1];
        console.log("price",price);
      }else{
        ingredients[param[0]] = +param[1];
      }
    }
    setIngredient({ ingredients: ingredients,price });
  }, []);

  const checkoutCancelledHandler = () => {
    navigate("/");
  };
  const checkoutContinuedHandler = () => {
    navigate("contact-data");
  };
  return (
    <>
      <CheckoutSummary
        ingredients={ingredient.ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Outlet context={ingredient}/>
    </>
  );
};

export default Checkout;
