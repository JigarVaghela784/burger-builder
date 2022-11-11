import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import Button from "../UI/Button/Button";
import style from "./Auth.module.css";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/action/index";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { updatedObject } from "../../Shared/utility";
import { validationHandler } from "../../Shared/validation";

const Auth = ({
  onAuth,
  loading,
  isAuthenticated,
  error,
  setAuthNavigateToPath,
  buildingBurger,
  onSetAuthNavigatePath,
}) => {
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
  useEffect(() => {
    if (!buildingBurger && setAuthNavigateToPath !== "/") {
      onSetAuthNavigatePath();
    }
  },[buildingBurger,setAuthNavigateToPath,onSetAuthNavigatePath]);

  const onChangeHandler = (e, id) => {
    const updAuthForm = updatedObject(auth.authForm, {
      [id]: updatedObject(auth.authForm[id], {
        value: e.target.value,
        valid: validationHandler(e.target.value, auth.authForm[id].validation),
        focused: true,
      }),
    });
    setAuth({ ...auth, authForm: updAuthForm });
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
    onAuth(
      auth.authForm.email.value,
      auth.authForm.password.value,
      auth.isSignup
    );
  };

  const switchAuthModeHandler = () => {
    setAuth((prev) => {
      return { authForm: prev.authForm, isSignup: !prev.isSignup };
    });
  };

  let form = formInputData.map((formEl) => (
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
  if (loading) {
    form = <Spinner />;
  }
  let authNavigate = null;
  if (isAuthenticated) {
    authNavigate = <Navigate to={setAuthNavigateToPath} />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error.message}</p>;
  }

  return (
    <div className={style.Auth}>
      {errorMessage}
      {authNavigate}
      <form onSubmit={submitFormHandler}>
        {form}
        <Button btnType={"Success"}>SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType={"Danger"}>
        Switch To {auth.isSignup ? "Sign In" : "Sign Up"}
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    setAuthNavigateToPath: state.auth.authNavigateToPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthNavigatePath: () => dispatch(actions.setAuthNavigateToPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
