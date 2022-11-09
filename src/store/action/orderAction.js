import * as actionTypes from "./actionTypes";
import axios from "../../axios-Order";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
  };
};
export const purchaseBurger = (orderData,token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth="+token, orderData)
      .then((response) => {
        if (response.status === 200) {
          console.log("response", response);
          dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        }
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
export const orderFetchSuccess = (order) => {
  return {
    type: actionTypes.ORDER_FETCH_SUCCESS,
    order: order,
  };
};

export const orderFetchFail = (error) => {
  return {
    type: actionTypes.ORDER_FETCH_FAIL,
    error: error,
  };
};
export const orderFetchStart = () => {
  return {
    type: actionTypes.ORDER_FETCH_START,
  };
};
export const orderFetch = (token) => {
  return (dispatch) => {
    dispatch(orderFetchStart());
    axios.get("/orders.json?auth="+token)
      .then((res) => {
        const fetchOrderData = [];
        for (let key in res.data) {
          fetchOrderData.push({ ...res.data[key], id: key });
        }
        dispatch(orderFetchSuccess(fetchOrderData));
      })
      .catch((error) => {
        dispatch(orderFetchFail(error));  
      });
  };
};
