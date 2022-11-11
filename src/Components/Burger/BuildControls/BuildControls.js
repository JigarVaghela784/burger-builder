import React from "react";
import style from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
export default function BuildControls({
  ingredientsAdd,
  ingredientsRemove,
  disabled,
  price,
  purchasable,
  Ordered,
  isAuth
}) {
  const Control = [
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" },
    { label: "Salad", type: "salad" },
  ];
  
  return (
    <div className={style.BuildControls}>
      <p>
        Current Price:<strong>{price}</strong>
      </p>

      {Control.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => ingredientsAdd(ctrl.type)}
            removed={() => ingredientsRemove(ctrl.type)}
            disabled={disabled[ctrl.type]}
          />
        );
      })}
      <button
        disabled={!purchasable}
        className={style.OrderButton}
        onClick={Ordered}
      >
       {isAuth?"Order Now":"Sign In To Order"}
      </button>
    </div>
  );
}
