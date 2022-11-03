import React from "react";
import style from "./Button.module.css";
// import { Button } from 'antd';
export default function button({children,btnType,clicked,disabled}) {


  return (
    <button
      className={[style.Button, style[btnType]].join(" ")}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
