import React from "react";
import style from "./Order.module.css";
const Order = ({ price, ingredient }) => {
  const ingredients = [];
  for (let igName in ingredient) {
    ingredients.push({ name: igName, amount: ingredient[igName] });
  }
  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransForm: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
          border: "1px solid #ccc",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <>
      <div className={style.Order}>
        <p>Ingredients:{ingredientOutput}</p>
        <p>
          price: Rs.<strong>{price}</strong>
        </p>
      </div>
    </>
  );
};

export default Order;
