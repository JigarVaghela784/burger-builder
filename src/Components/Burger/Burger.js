import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import style from "./Burger.module.css";

function Burger( { ingredients },props,) {

  let transformIngredient = Object.keys(ingredients)
    .map((igKey) => {
      return [...Array(ingredients[igKey])].map((el, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (+transformIngredient === 0) {
    transformIngredient = <p>Please Start Adding Ingredient!</p>;
  }
  return (
    <div className={style.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformIngredient}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
}
export default Burger