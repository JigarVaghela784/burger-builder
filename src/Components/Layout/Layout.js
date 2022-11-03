import React,{useEffect, useState} from 'react'
import classes from './Layout.module.css' 
import Toolbar from '../header/Navigation/Toolbar'
import SideDrawer from '../header/Navigation/SideDrawer/SideDrawer'
export default function Layout(props) {
const [sideDrawer, setSideDrawer] = useState(
  {
    showSideDrawer:true,
  })
  const sideDrawerCloseHandler=()=>{
    setSideDrawer({showSideDrawer:false})
  }
  const sideDrawerToggleandler=()=>{
    setSideDrawer({showSideDrawer:!sideDrawer.showSideDrawer})
  }
  useEffect(()=>{
    setSideDrawer({showSideDrawer:false})
  },[])
  return (
    <>
    <SideDrawer closed={sideDrawerCloseHandler} opened={sideDrawer.showSideDrawer}/>
    <Toolbar drawerToggleBtn={sideDrawerToggleandler}/>
    <main className={classes.content}>
        {props.children}
    </main>
    </>
  )
}
