import React, { useState } from "react";
import Input from "../Form/Input";
import Button from "../UI/Button/Button";
import style from "./Auth.module.css";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";

const Auth = ({ onAuth,loading,error }) => {
  const [auth, setAuth] = useState({
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-Mail",
        },
        value: "",
        validation: {
          require: true,
          isEmail: true,
        },
        valid: false,
        focused: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          require: true,
          minLength: 8,
        },
        valid: false,
        focused: false,
      },
    },
    isSignup: true,
  });
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
  console.log('loading', loading)

  const onChangeHandler = (e, id) => {
    const updAuthForm = {
      ...auth.authForm,
      [id]: {
        ...auth.authForm[id],
        value: e.target.value,
        valid: validationHandler(e.target.value, auth.authForm[id].validation),
        focused: true,
      },
    };
    setAuth({...auth, authForm: updAuthForm });
  };

  const formInputData = [];
  for (let key in auth.authForm) {
    formInputData.push({
      id: key,
      config: auth.authForm[key],
    });
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    onAuth(auth.authForm.email.value, auth.authForm.password.value,auth.isSignup);
  };

  const switchAuthModeHandler = () => {
    setAuth(prev=>{
        return{authForm:prev.authForm,isSignup:!prev.isSignup}
    });
  };

  let form = formInputData.map((formEl) => (
    // console.log('formEl', formEl),
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
  ));
  if(loading){
    form=<Spinner/>
  }

  let errorMessage=null
  if(error){
    errorMessage=(
        <p>{error.message}</p>
    )
  }

  return (
    <div className={style.Auth}>
        {errorMessage}
      <form onSubmit={submitFormHandler}>
        {form}
        <Button btnType={"Success"}>SUBMIT</Button>
        <Button clicked={switchAuthModeHandler} btnType={"Danger"}>
          Switch To {auth.isSignup ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
