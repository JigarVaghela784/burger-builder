import * as actionType from "../action/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 20,
  error:false
};
const Ingredient_Price = {
  salad: 10,
  bacon: 20,
  cheese: 15,
  meat: 25,
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + Ingredient_Price[action.ingredientName],
      };
    case actionType.REMOVE_INGREDIENT:
      return {  
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - Ingredient_Price[action.ingredientName],
      };
    case actionType.SET_INGREDIENT:
      return {
        ...state,
        ingredients:{
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat
        }
        ,
        error:false
      };
    case actionType.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error:true
      };

    default:
      break;
  }
  return state;
};
export default Reducer;
