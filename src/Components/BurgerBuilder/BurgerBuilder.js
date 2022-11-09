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
import * as actions from "../../store/action/index";

function BurgerBuilder({
  ingredients,
  price,
  error,
  onAddIngredient,
  onRemoveIngredient,
  onInitIngredient,
  onPurchaseInit,
  isAuthenticated,
  onSetAuthNavigatePath
}) {
  const [ingredient, setIngredient] = useState({
    purchasable: false,
    purchasing: false,
    loading: false,
    // error: false,
  });
  const navigate = useNavigate();

  // const [errors, setErrors] = useState({ errors: null });
  // useEffect(() => {
  //   const reqInterceptors = axios.interceptors.request.use((req) => {
  //     setErrors({ errors: null });
  //     return req;
  //   });
  //   const resInterceptors = axios.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       setErrors({ errors: error });
  //     }
  //   );
  //   return () => {
  //     axios.interceptors.request.eject(reqInterceptors);
  //     axios.interceptors.request.eject(resInterceptors);
  //   };
  // }, []);

  useEffect(() => {
    onInitIngredient();
  }, [onInitIngredient]);

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
    if (isAuthenticated) {
      setIngredient({
        ...ingredient,
        purchasing: true,
      });
    } else {
      onSetAuthNavigatePath("/checkout")
      navigate("/auth");
    }
  };
  const purchaseCancelHandler = () => {
    setIngredient({
      ...ingredient,
      purchasing: false,
    });
  };
  const purchaseContinueHandler = () => {
    onPurchaseInit();
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
  let burger = error ? <p>Ingredients Can't Load!</p> : <Spinner />;

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
          isAuth={isAuthenticated}
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
  // if (ingredient.loading) {
  //   orderSummary = <Spinner />;
  // }

  // const errorHandler = () => {
  //     // setErrors({error:null})
  //     return error
  // };
  return (
    <>
      <Modal show={ingredient.purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
      <WithErrorHandler error={error} />
      {/* <Modal show={error.error} modalClosed={errorHandler}>
          {error.error ? error?.error?.message : null}
        </Modal> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingsName) => dispatch(actions.addIngredients(ingsName)),
    onRemoveIngredient: (ingsName) =>
      dispatch(actions.removeIngredients(ingsName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()), 
    onSetAuthNavigatePath: (path) =>
      dispatch(actions.setAuthNavigateToPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
