import './UserNameInput.css';
import React from "react";
import { IconContext } from "react-icons"
import { MdOutlineEmojiPeople } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

const InputValueType              =   {untouchedInput: 0, touchedValidInput: 1, touchedInvalidInput: 2}

function UserNameInput(props) {

  const checkInputStatus            =   (touched, error) => {
    switch(true) {
      case touched == null:             return InputValueType.untouchedInput;
      case error == null:               return InputValueType.touchedValidInput;
      default:                          return InputValueType.touchedInvalidInput;
    }
  }

  const userNameMessage             =   () => {return helpMessage(props.touched, props.error, 'Please give a contact name (required)')}

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
            <label htmlFor = {props.name}>Number of guests <MdOutlineEmojiPeople /></label>
            <input
            id={props.name}
            name={props.name}
            type="text"
            className={getStyle()}
            {...props.extra}
            />
        </p>
        {userNameMessage()}
    </>
  );
};

export default UserNameInput;