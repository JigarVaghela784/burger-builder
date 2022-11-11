import * as actionTypes from "../action/actionTypes";
import { updatedObject } from "../../Shared/utility";
const initialState = {
  order: [],
  loading: false,
  purchased: false,
  purchaseError: null,
  orderError: null,
};

const purchaseInit = (state, action) => {
  return updatedObject(state, { purchased: false });
};
const purchaseBurgerStart = (state, action) => {
  return updatedObject(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
  let newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return updatedObject(state, {
    loading: false,
    purchased: true,
    order: state.order.concat(newOrder),
  });
};
const purchaseBurgerFail = (state, action) => {
  return updatedObject(state, {
    loading: false,
    purchaseError: action.purchaseError,
  });
};
const orderFetchStart = (state, action) => {
  return updatedObject(state, { loading: true });
};
const orderFetchSuccess = (state, action) => {
  return updatedObject(state, {
    order: action.order,
    loading: false,
  });
};
const orderFetchFail = (state, action) => {
  return updatedObject(state, {
    loading: false,
    orderError: action.orderError,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.ORDER_FETCH_START:
      return orderFetchStart(state, action);

    case actionTypes.ORDER_FETCH_SUCCESS:
      return orderFetchSuccess(state, action);

    case actionTypes.ORDER_FETCH_FAIL:
      return orderFetchFail(state, action);

    default:
      return state;
  }
};
export default reducer;
