import React from "react";
import style from "./BuildControl.module.css";
export default function BuildControl({ label, added, removed,disabled}) {
  return (
    <div className={style.BuildControl}>
      <div className={style.Label}>{label}</div>
      <button className={style.Less} onClick={removed} disabled={disabled}>
        Less
      </button>
      <button className={style.More} onClick={added}>
        Add
      </button>
    
    </div>
  );
}
