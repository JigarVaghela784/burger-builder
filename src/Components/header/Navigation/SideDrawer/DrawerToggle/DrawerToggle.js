import React from 'react'
import style from './DrawerToggle.module.css'
export default function DrawerToggle({Clicked}) {
  return (
    <div className={style.DrawerToggle} onClick={Clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
