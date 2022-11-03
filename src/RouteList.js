import React from "react";
import BurgerBuilder from "./Components/BurgerBuilder/BurgerBuilder";
import Checkout from "./Components/Checkout/Checkout";

const RouteList = [
  {
    path: "/checkout",
    name: "Checkout",
    component: <Checkout />,
    isPrivate: false,
    layout: "public",
  },
  {
    path: "/",
    name: "BurgerBuilder",
    component: <BurgerBuilder />,
    isPrivate: false,
    layout: "public",
  },
];

export default RouteList;
