import React from 'react'
import style from './Toolbar.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from './NavigationItems/NavigationItems'
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'
export default function Toolbar({drawerToggleBtn,isAuth}) {

  return (
    <header className={style.Toolbar}>
          <DrawerToggle Clicked={drawerToggleBtn}/>
          <div className={style.Logo}>
          <Logo/>
          </div>
            <nav className={style.DesktopOnly}>
                <NavigationItems isAuth={isAuth}/>
            </nav>
    </header>
  )
}
