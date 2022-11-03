import React from "react";
import PropTypes from "react";
import style from "./BurgerIngredients.module.css";
const BurgerIngredients = (props) => {
  let ingredients = null;
  switch (props.type) {
    case "bread-bottom":
      ingredients = <div className={style.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredients = (
        <div className={style.BreadTop}>
          <div className={style.Seeds1}></div>
          <div className={style.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredients = <div className={style.Meat}></div>;
      break;
    case "cheese":
      ingredients = <div className={style.Cheese}></div>;
      break;
    case "bacon":
      ingredients = <div className={style.Bacon}></div>;
      break;
    case "salad":
      ingredients = <div className={style.Salad}></div>;
      break;
    default:
      ingredients = null;
  }
  return ingredients;
};
BurgerIngredients.prototype = {
  type: PropTypes.string?.isRequired,
};
export default BurgerIngredients;
