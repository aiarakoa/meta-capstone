import './NumGuestsInput.css';
import React from "react";
import { IconContext } from "react-icons"
import { MdPeople } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

const InputValueType              =   {untouchedInput: 0, touchedValidInput: 1, touchedInvalidInput: 2}

function NumGuestsInput(props) {

  const checkInputStatus            =   (touched, error) => {
    switch(true) {
      case touched == null:             return InputValueType.untouchedInput;
      case error == null:               return InputValueType.touchedValidInput;
      default:                          return InputValueType.touchedInvalidInput;
    }
  }

  const numGuestsMessage             =   () => {return helpMessage(props.touched, props.error, 'Please enter how many guests are expected (required)')}

  const helpMessage = (touched, error, messageText) => {
    switch(checkInputStatus(touched, error)) {
      case InputValueType.touchedInvalidInput:         return (
        <p>
          {props.error}
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
          {messageText}
        </p>
      )
    }
  }

  const inputStatusChecker            =   () => {
    switch(true) {
      case !props.touched:               return InputValueType.untouchedInput;
      case props.error == null:          return InputValueType.touchedValidInput;
      default:                          return InputValueType.touchedInvalidInput;
    }
  }

  const getStyle       =   () => {
    switch(inputStatusChecker()) {
      case InputValueType.touchedInvalidInput:          return 'invalid';
      case InputValueType.touchedValidInput:            return 'valid';
      default:                                          return 'untouched';
    }
  }

  return (
    <>
        <p>
            <label htmlFor = {props.name}>Number of guests <MdPeople /></label>
            <input
            id={props.name}
            name={props.name}
            type="number"
            className={getStyle()}
            {...props.extra}
            />
        </p>
        {numGuestsMessage()}
    </>
  );
};

export default NumGuestsInput;