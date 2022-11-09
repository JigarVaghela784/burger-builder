import React from "react";
import Logo from "../../Logo/Logo";
import style from "./SideDrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../../UI/BackDrop/BackDrop";
export default function SideDrawer({opened,closed,isAuth}) {
  let attachedStyle=[style.SideDrawer,style.Close];
  if(opened){
    attachedStyle=[style.SideDrawer,style.Open]
  }

  return (
    <>
      <BackDrop show={opened} clicked={closed}/>
      <div className={attachedStyle.join(' ')}>
        <div className={style.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={isAuth} />
        </nav>
      </div>
    </>
  );
}
