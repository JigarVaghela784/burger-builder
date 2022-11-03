import React, { useEffect, useState } from "react";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import OrderSummary from "../Burger/OrderSummery/OrderSummary";
import WithErrorHandler from "../UI/hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../UI/Spinner/Spinner";
import axios from "../../axios-Order";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actionType from "../../Store/Action";

function BurgerBuilder({ingredients,price,onAddIngredient,onRemoveIngredient}) {
  const [ingredient, setIngredient] = useState({
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  });
  const navigate = useNavigate();

  const [error, setError] = useState({ error: null });
  useEffect(() => {
    const reqInterceptors = axios.interceptors.request.use((req) => {
      setError({ error: null });
      return req;
    });
    const resInterceptors = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        setError({ error: error });
        console.log("error@@@", error);
      }
    );
    return () => {
      axios.interceptors.request.eject(reqInterceptors);
      axios.interceptors.request.eject(resInterceptors);
    };
  }, []);

  useEffect(() => {
    // axios
    //   .get(
    //     "https://my-burger-app-59a08-default-rtdb.firebaseio.com/ingredients.json"
    //   )
    //   .then((response) => {
    //     setIngredient({ ...ingredient, ingredients: response.data });
    //     // console.log(response.data, "response");
    //   })
    //   .catch((error) => {
    //     setIngredient({ error: true });
    //   });
  }, [ingredient]);

  const updatedPurchaseState = (ingredients, updatedPrice) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ? true : false;
  };
 

  const purchaseHandler = () => {
    setIngredient({
      ...ingredient,
      purchasing: true,
    });
  };
  const purchaseCancelHandler = () => {
    setIngredient({
      ...ingredient,
      purchasing: false,
    });
  };
  const purchaseContinueHandler = () => {
    navigate({  
      pathname: "/checkout",
    });
  };
  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = ingredient.error ? <p>Ingredients Can't Load!</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <>
        <Burger ingredients={ingredients} />
        <BuildControls
          Ordered={purchaseHandler}
          ingredientsAdd={onAddIngredient}
          ingredientsRemove={onRemoveIngredient}
          disabled={disabledInfo}
          price={price}
          purchasable={updatedPurchaseState(ingredients)}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        price={price}
        ingredients={ingredients}
        cancelPurchase={purchaseCancelHandler}
        continuePurchase={purchaseContinueHandler}
      />
    );
  }
  if (ingredient.loading) {
    orderSummary = <Spinner />;
  }

  const errorHandler = () => {
    setError({ error: null });
  };
  return (
    <>
      <Modal show={ingredient.purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
      <WithErrorHandler error={error} errorHandler={errorHandler} />
      {/* <Modal show={error.error} modalClosed={errorHandler}>
          {error.error ? error?.error?.message : null}
        </Modal> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingsName) =>
      dispatch({ 
        type: actionType.ADD_INGREDIENT,
         ingredientName: ingsName }),
    onRemoveIngredient: (ingsName) =>
      dispatch({
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: ingsName,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
