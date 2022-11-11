import * as actionType from "../action/actionTypes";
import { updatedObject } from "../../Shared/utility";
const initialState = {
  ingredients: null,
  totalPrice: 20,
  error: null,
  building: false,
};
const Ingredient_Price = {
  salad: 10,
  bacon: 20,
  cheese: 15,
  meat: 25,
};
const addIngredients = (state, action) => {
  const updAddIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updAddIngredients = updatedObject(state.ingredients, updAddIngredient);
  const updAddState = {
    ingredients: updAddIngredients,
    totalPrice: state.totalPrice + Ingredient_Price[action.ingredientName],
    building: true,
  };
  return updatedObject(state, updAddState);
};
const removeIngredients = (state, action) => {
  const updRemoveIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updRemoveIngredients = updatedObject(
    state.ingredients,
    updRemoveIngredient
  );
  const updRemoveState = {
    ingredients: updRemoveIngredients,
    totalPrice: state.totalPrice - Ingredient_Price[action.ingredientName],
    building: true,
  };
  return updatedObject(state, updRemoveState);
};
const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 20,
    error: null,
    building: false,
  });
};
const fetchIngredientsFailed = (state, action) => {
  return updatedObject(state, { error: action.error });
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredients(state, action);

    case actionType.REMOVE_INGREDIENT:
      return removeIngredients(state, action);

    case actionType.SET_INGREDIENT:
      return setIngredients(state, action);

    case actionType.FETCH_INGREDIENT_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      break;
  }
  return state;
};
export default Reducer;
