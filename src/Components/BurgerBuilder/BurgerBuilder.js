import React, { useEffect, useState } from "react";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import OrderSummary from "../Burger/OrderSummery/OrderSummary";
import WithErrorHandler from "../UI/hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../UI/Spinner/Spinner";
import axios from "../../axios-Order";
import { useNavigate } from "react-router-dom";
import Search from "antd/lib/transfer/search";
function BurgerBuilder(props) {
  const Ingredient_Price = {
    salad: 10,
    bacon: 20,
    cheese: 15,
    meat: 25,
  };

  const [ingredient, setIngredient] = useState({
    ingredients: null,
    totalPrice: 20,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  });
  const navigate=useNavigate();

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
      console.log("Component Will Unmount",reqInterceptors,resInterceptors);
   
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://my-burger-app-59a08-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        setIngredient({ ...ingredient, ingredients: response.data });
        // console.log(response.data, "response");
      })
      .catch((error) => {
        setIngredient({ error: true });
      });
  }, []);
  // console.log("ingridtetess:", ingredient);

  const updatedPurchaseState = (ingredients, updatedPrice) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setIngredient({
      ingredients: ingredients,
      totalPrice: updatedPrice,
      purchasable: sum > 0 ? true : false,
    });
  };
  const addIngredientHandler = (type) => {
    const oldCount = ingredient.ingredients[type];

    let updateIngredients = {
      ...ingredient.ingredients,
    };
    updateIngredients[type] = oldCount + 1;
    const oldPrice = ingredient.totalPrice;
    const updatedPrice = oldPrice + Ingredient_Price[type];
    setIngredient({
      ingredients: updateIngredients,
      totalPrice: updatedPrice,
      purchasable: ingredient.purchasable,
    });
    updatedPurchaseState(updateIngredients, updatedPrice);
  };
  const removeIngredientHandler = (type) => {
    const oldCount = ingredient.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    let updateIngredients = {
      ...ingredient.ingredients,
    };
    updateIngredients[type] = oldCount - 1;
    const oldPrice = ingredient.totalPrice;
    const updatedPrice = oldPrice - Ingredient_Price[type];
    setIngredient({
      ingredients: updateIngredients,
      totalPrice: updatedPrice,
      purchasable: ingredient.purchasable,
    });
    updatedPurchaseState(updateIngredients, updatedPrice);
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
  
    const checkoutIng=[];
    for(let i in ingredient.ingredients){
      checkoutIng.push(encodeURIComponent(i)+'='+encodeURIComponent(ingredient.ingredients[i]))
    }
    checkoutIng.push('price='+ingredient.totalPrice)
    const checkoutIngString=checkoutIng.join('&')
    // navigate('/checkout')
    navigate({
      pathname:'/checkout' ,
      search:'?'+checkoutIngString,
      })
      console.log("naviagte",checkoutIngString)
      
  };
  const disabledInfo = {
    ...ingredient.ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = ingredient.error ? <p>Ingredients Can't Load!</p> : <Spinner />;

  if (ingredient.ingredients) {
    burger = (
      <>
        <Burger ingredients={ingredient.ingredients} />
        <BuildControls
          Ordered={purchaseHandler}
          ingredientsAdd={addIngredientHandler}
          ingredientsRemove={removeIngredientHandler}
          disabled={disabledInfo}
          price={ingredient.totalPrice}
          purchasable={ingredient.purchasable}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        price={ingredient.totalPrice}
        ingredients={ingredient.ingredients}
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
export default BurgerBuilder;
