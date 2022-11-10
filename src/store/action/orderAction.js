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
    purchaseError: error,
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
  };
};
export const purchaseBurger = (orderData, token) => {
  return async (dispatch) => {
    dispatch(purchaseBurgerStart());
    const url = `/orders.json?auth=${token.replace(/['"]+/g, "").trim()}`;
       try {
      const response = await axios.post(url, orderData);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
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
    orderError: error,
  };
};
export const orderFetchStart = () => {
  return {
    type: actionTypes.ORDER_FETCH_START,
  };
};
export const orderFetch = (token,userId) => {
  return async (dispatch) => {
    dispatch(orderFetchStart());
    const url = `/orders.json?auth=${token.replace(/['"]+/g, "").trim()}&orderBy="userId"&equalTo="${userId}"`;
    try {
      const res = await axios.get(url);
      const fetchOrderData = [];
      for (let key in res.data) {
        fetchOrderData.push({ ...res.data[key], id: key });
      }
      dispatch(orderFetchSuccess(fetchOrderData));
    } catch (error) {
      dispatch(orderFetchFail(error));
    }
  };
};
