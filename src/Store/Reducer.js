import * as actionType from './Action'

const initialState={
    ingredients:{
        salad:0,
        bacon:0,
        meat:0,
        cheese:0
    },
    totalPrice:20
}
const Ingredient_Price = {
    salad: 10,
    bacon: 20,
    cheese: 15,
    meat: 25,
  };
const Reducer =(state=initialState,action)=>{
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+Ingredient_Price[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-Ingredient_Price[action.ingredientName]
            }
    
        default:
            break;
    }
    return state
}
export default Reducer;