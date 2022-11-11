import React from 'react'
import style from './BackDrop.module.css'
export default function BackDrop({show,clicked}) {
  return (
    show?<div className={style.BackDrop} onClick={clicked}></div>:null
  )
}
