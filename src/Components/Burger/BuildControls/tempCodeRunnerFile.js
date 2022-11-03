import React from "react";
import style from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
export default function BuildControls({ingredientsAdd}) {
  const Control = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
  ];
  console.log("add",ingredientsAdd)
  return (
      <div className={style.BuildControls}>
      {Control.map((ctrl) => 
          {return(<BuildControl key={ctrl.label} label={ctrl.label} added={()=>ingredientsAdd[ctrl.type]} />)}
          )}
    </div>
  );
}
