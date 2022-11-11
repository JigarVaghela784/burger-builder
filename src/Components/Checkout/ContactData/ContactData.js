import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import style from "./ContactData.module.css";
import Input from "../../Form/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/action/index";
import WithErrorHandler from "../../UI/hoc/WithErrorHandler/WithErrorHandler";
import { updatedObject } from "../../../Shared/utility";
import { validationHandler } from "../../../Shared/validation";
const ContactData = ({
  ingredients,
  price,
  onBurgerPurchase,
  loading,
  error,
  token,
  userId,
}) => {
  const [contactData, setContactData] = useState({
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          require: true,
        },
        valid: false,
        focused: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          require: true,
          isEmail: true,
        },
        valid: false,
        focused: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          require: true,
        },
        valid: false,
        focused: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          require: true,
          minLength: 6,
          maxLength: 6,
          isNumeric: true,
        },
        valid: false,
        focused: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          require: true,
        },
        valid: false,
        focused: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "normal", displayValue: "Normal" },
            { value: "fastest", displayValue: "Fastest" },
          ],
        },
        value: "normal",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  });
  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let id in contactData.orderForm) {
      formData[id] = contactData.orderForm[id].value;
    }
    const order = {
      ingredient: ingredients,
      price: price,
      orderData: formData,
      userId: userId,
    };
    onBurgerPurchase(order, token);
    console.log('token11', order)
  };
  const onChangeHandler = (e, id) => {
    const updElement = updatedObject(contactData.orderForm[id], {
      value: e.target.value,
      valid: validationHandler(e.target.value, contactData.orderForm[id].validation),
      focused: true,
    });
    const updForm=updatedObject(contactData.orderForm,{
      [id] : updElement
    })
    let formIsValid = true;
    for (let id in updForm) {
      formIsValid = updForm[id].valid && formIsValid;
    }
    setContactData({ orderForm: updForm, formIsValid: formIsValid });
  };

  const formInputData = [];
  for (let key in contactData.orderForm) {
    formInputData.push({
      id: key,
      config: contactData.orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formInputData.map((formEl) => (
        <Input
          key={formEl.id}
          elementType={formEl.config.elementType}
          elementConfig={formEl.config.elementConfig}
          value={formEl.config.value}
          inValid={!formEl.config.valid}
          shouldValidation={formEl.config.validation}
          focused={formEl.config.focused}
          onChange={(e) => onChangeHandler(e, formEl.id)}
        />
      ))}
      <Button btnType={"Success"} disabled={!contactData.formIsValid}>
        ORDER
      </Button>
    </form>
  );
  let errorMessage = null;
  if (error) {
    errorMessage = <WithErrorHandler error={error} />;
  }

  if (loading) {
    form = <Spinner />;
  }

  return (
    <>
      <div className={style.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
        {errorMessage}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    error: state.order.purchaseError,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerPurchase: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
