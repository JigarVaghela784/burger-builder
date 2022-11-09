import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "../../../axios-Order";
import style from "./ContactData.module.css";
import Input from "../../Form/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/action/index";
import WithErrorHandler from "../../UI/hoc/WithErrorHandler/WithErrorHandler";
const ContactData = ({
  ingredients,
  price,
  onBurgerPurchase,
  loading,
  error,
  token,
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
    // loading: false,
  });
  const navigate = useNavigate();

  const orderHandler = (event) => {
    event.preventDefault();
    // const ingredients = {};
    // const price = 0;
    const formData = {};
    for (let id in contactData.orderForm) {
      formData[id] = contactData.orderForm[id].value;
    }
    const order = {
      ingredient: ingredients,
      price: price,
      orderData: formData,
    };
    onBurgerPurchase(order, token);
  };
  const validationHandler = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.require) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };
  const onChangeHandler = (e, id) => {
    const updForm = { ...contactData.orderForm };
    const updElement = { ...updForm[id] };
    updElement.value = e.target.value;
    updElement.valid = validationHandler(
      updElement.value,
      updElement.validation
    );
    updElement.focused = true;
    updForm[id] = updElement;
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
    <WithErrorHandler error={error} />;
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
    error: state.order.error,
    token: state.order.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerPurchase: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
