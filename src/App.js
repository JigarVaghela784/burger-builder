import React from "react";
import "./App.css";
// import RouteList from "./RouteList";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Components/BurgerBuilder/BurgerBuilder";
import Checkout from "./Components/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";
import ContactData from "./Components/Checkout/ContactData/ContactData";
import Orders from "./Components/Orders/Orders";

function App() {
  return (
    <>
      {/* <Routes>
          {RouteList.map((el) => {
            return (
              <Route exact path={el.path} element={el.component} key={el.name} />
            );
          })}
        </Routes> */}
      <Layout>
        <Routes>
          <Route path="/checkout" element={<Checkout />}>
            <Route path="contact-data" element={<ContactData />} />
          </Route>

          <Route path="orders" element={<Orders />} />
          <Route path="/" element={<BurgerBuilder />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
