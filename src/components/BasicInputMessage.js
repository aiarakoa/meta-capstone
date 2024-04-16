import './BasicInputMessage.css';
import React from "react";
import { useFormikContext } from "formik";
import { IconContext } from "react-icons"
import { IoCheckmarkCircle } from "react-icons/io5"

const InputValueType              =   {untouchedInput: 0, touchedValidInput: 1, touchedInvalidInput: 2}

function BaseInput(props) {

  const {touched, errors}         =   useFormikContext();

  const checkInputStatus          =   (touched, error) => {
    switch(true) {
      case touched == null:             return InputValueType.untouchedInput;
      case error == null:               return InputValueType.touchedValidInput;
      default:                          return InputValueType.touchedInvalidInput;
    }
  }

  const helpMessage = () => {
    switch(checkInputStatus(touched[props.name], errors[props.name])) {
      case InputValueType.touchedInvalidInput:         return (
        <p>
          {errors[props.name]}
        </p>
      );
      case InputValueType.touchedValidInput:           return (
        <figure>
          <IconContext.Provider
            value={{color: '#00cc00'}}>
            <IoCheckmarkCircle />
          </IconContext.Provider>
        </figure>
      );
      default:                          return (
        <p>
          {props.defaultMessage}
        </p>
      )
    }
  }

  return (
    <>
      {helpMessage()}
    </>
  );
};

export default BaseInput;