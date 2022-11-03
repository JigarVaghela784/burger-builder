import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import style from './CheckoutSummary.module.css'
const CheckoutSummary = ({ ingredients,checkoutCancelled,checkoutContinued }) => {
  return (
    <div className={style.CheckoutSummary}>
      <h1>We Hope It Tastes Well!</h1>
      <div style={{width:'100%',margin:'auto'}}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType={"Danger"} clicked={checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType={"Success"} clicked={checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
