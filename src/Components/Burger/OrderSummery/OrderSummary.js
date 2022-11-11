import React from "react";
import Button from "../../UI/Button/Button";
export default function OrderSummary({
  ingredients,
  cancelPurchase,
  continuePurchase,
  price
}) {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {ingredients[igKey]}
      </li>
      
    );
  });

  return (
    <div>
      <h2>Your Order</h2>
      <h3>A Delicious Burger With Following Ingredients:</h3>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price:{price}</strong></p>
      <p>Continue To Checkout?</p>
      <Button  btnType={"Danger"} clicked={cancelPurchase}>
        Cancel
      </Button>
      <Button  btnType={"Success"} clicked={continuePurchase}>
        Continue
      </Button>
    </div>
  );
}
