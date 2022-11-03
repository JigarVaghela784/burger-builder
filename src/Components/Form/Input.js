import React from "react";
import style from "./Input.module.css";
const Input = ({
  elementType,
  elementConfig,
  value,
  label,
  onChange,
  inValid,
  shouldValidation,
  focused
}) => {
  let inputElement = null;
  let InputStyle = [style.InputElement];

  if (inValid && shouldValidation&&focused) {
    InputStyle.push(style.InValid);
  }
  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={InputStyle.join(" ")}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={InputStyle.join(" ")}
          {...elementConfig}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={InputStyle.join(" ")}
          value={value}
          onChange={onChange}
        >
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={style.InputElement}
          {...elementConfig}
          value={value}
        />
      );
      break;
  }
  return (
    <div className={style.Input}>
      <label htmlFor={label} className={style.Label}>
        {label}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
