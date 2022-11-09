import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// import NavigationItem from './NavigationItem/NavigationItem'
import style from "./NavigationItems.module.css";
export default function NavigationItems({ isAuth }) {
  const location = useLocation();
  console.log("isAuth", isAuth);
  return (
    <ul className={style.NavigationItem}>
      <li className={style.NavigationItem}>
        <NavLink to="/" className={location.pathname === "/" ? style.active : null}>
          BurgerBuilder
        </NavLink>

        {!isAuth ? (
          <NavLink to="/auth" className={location.pathname === "/auth" ? style.active : null}>
            Authentication
          </NavLink>
        ) : (
          <>
            <NavLink to="/orders" className={location.pathname === "/orders" ? style.active : null}>
              Order
            </NavLink>
            <NavLink to="/Logout" className={location.pathname === "/Logout" ? style.active : null}>
              Logout
            </NavLink>
          </>
        )}
      </li>
    </ul>
  );
}
