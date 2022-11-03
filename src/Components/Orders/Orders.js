import React, { useState, useEffect } from "react";
import Order from "../Order/Order";
import axios from "../../axios-Order";
import WithErrorHandler from "../UI/hoc/WithErrorHandler/WithErrorHandler";

const Orders = () => {
  const [orderData, setOrderData] = useState({
    orders: [],
    loading: true,
  });
  const [error, setError] = useState({ error: null });
  useEffect(() => {
    axios
      .get("orders.json")
      .then((res) => {
        const fetchOrderData = [];
        setError({ error: null });
        for (let key in res.data) {
          fetchOrderData.push({ ...res.data[key], id: key });
        }
        // console.log("res", res.data);
        setOrderData({ loading: false,orders:fetchOrderData });
      })
      .catch((error) => {
        setOrderData({ loading: false });
        setError({ error: error });
      });
  }, []);
  const errorHandler = () => {
    setError({ error: null });
  };
  return (
    <div>
      {/* <Order />
      <Order /> */}
      {orderData.orders.map(order=>(
        <Order key={order.id} price={order.price} ingredient={order.ingredient}/> 
      ))}  
      <WithErrorHandler error={error} errorHandler={errorHandler} />
    </div>
  );
};

export default Orders;
