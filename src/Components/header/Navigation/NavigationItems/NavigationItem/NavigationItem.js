import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavigationItem.module.css";
export default function NavigationItem({ active, link, children }) {
  return (
    <li className={style.NavigationItem}>
      <NavLink  to={link} activeclassname={style.active}  >
        {children}
      </NavLink>
    </li>
  );
}
