import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "../../../axios-Order";
import style from "./ContactData.module.css";
import Input from "../../Form/Input";
const ContactData = () => {
  const { ingredients } = useOutletContext();
  // console.log("inside contactData", useOutletContext().ingredients);
  const contactDataIngredients = useOutletContext().ingredients;
  const contactDataIngredientsPrice = useOutletContext().price;
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
        focused:false
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
        },
        valid: false,
        focused:false
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
        focused:false
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
          minLength:6,
          maxLength:6,
        },
        valid: false,
        focused:false
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
        focused:false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "normal", displayValue: "Normal" },
            { value: "fastest", displayValue: "Fastest" },
          ],
        },
        value: "",
        validation:{},
        valid:true,
      },
    },
    formIsValid:false,
    loading: false,
  });
  const navigate = useNavigate();

  const orderHandler = (event) => {
    event.preventDefault();
    console.log("IngredientsContactData", contactDataIngredients);
    console.log("IngredientsContactDataPrice", contactDataIngredientsPrice);
    const ingredients = {};
    const price = 0;
    const formData = {};
    for (let id in contactData.orderForm) {
      formData[id] = contactData.orderForm[id].value;
    }
    const order = {
      ingredient: contactDataIngredients,
      price: contactDataIngredientsPrice,
      orderData: formData,
    };
    setContactData({ loading: true });
    axios

      .post("/orders.json", order)
      .then((response) => {
        setContactData({ loading: false });
        navigate("/");
      })
      .catch((error) => {
        // console.log("error!!!", error);
        setContactData({ loading: false });
      });
  };

  const validationHandler=(value,rules)=>{
    let isValid=true;
    if(!rules){
      return true;
    }
    if(rules.require){
      isValid=value.trim()!==''&&isValid;
    }
    if(rules.minLength){
      isValid=value.length >=rules.minLength&&isValid;
    }
     if(rules.maxLength){
      isValid=value.length <=rules.maxLength&&isValid;
    }
    return isValid;
  }

  const onChangeHandler = (e, id) => {
    // console.log("e.target.value", e.target.value);
    // console.log("id", id);
    const updForm = { ...contactData.orderForm };
    const updElement = { ...updForm[id] };
    updElement.value = e.target.value;
    updElement.valid=validationHandler(updElement.value,updElement.validation)
    updElement.focused=true
    updForm[id] = updElement; 
    let formIsValid=true;
    for(let id in updForm){
      formIsValid=updForm[id].valid&&formIsValid
    }
    console.log('formIsValid', formIsValid)
    console.log('updElement', updElement)
    setContactData({ orderForm: updForm,formIsValid:formIsValid });
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
      {/* <Input elementType='...' elementConfig='...' value='...' /> */}
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
      <Button btnType={"Success"} disabled={!contactData.formIsValid}>ORDER</Button>
    </form>
  );
  if (contactData.loading) {
    form = <Spinner />;
  }

  return (
    <div className={style.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
