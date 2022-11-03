import React from 'react'
import style from './Toolbar.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from './NavigationItems/NavigationItems'
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'
export default function Toolbar({drawerToggleBtn}) {
  return (
    <header className={style.Toolbar}>
        {/* <Logo/>
        <nav>
            <NavigationItems/>
        </nav>
        <div>Menu</div> */}
          <DrawerToggle Clicked={drawerToggleBtn}/>
          <div className={style.Logo}>
          <Logo/>
          </div>
            <nav className={style.DesktopOnly}>
                <NavigationItems/>
            </nav>
    </header>
  )
}
