import React from "react";
import style from "./Logo.module.css";
import LogoImg from "../../../assets/Image/logo.png";
export default function Logo() {
  return (
    <div className={style.Logo}>
      <img src={LogoImg} alt="Logo" />
    </div>
  );
}
