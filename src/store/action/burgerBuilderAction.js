import * as actionTypes from "./actionTypes";
import axios from "../../axios-Order";
export const addIngredients = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const removeIngredients = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};

export const fetchIngredientFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
    error:error
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get(
        "https://my-burger-app-59a08-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        dispatch(setIngredient(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientFailed(error));
      });
  };
};
