import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import style from './NavigationItems.module.css'
export default function NavigationItems() {
  return (
    <ul className={style.NavigationItem}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Authentication</NavigationItem>
    </ul>
  )
}
