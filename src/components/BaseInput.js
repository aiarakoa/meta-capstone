import './BaseInput.css';
import React, {Fragment} from "react";
import { useFormikContext } from "formik";
import { IconContext } from "react-icons"
import { MdDateRange, MdAccessTime, MdPeople, MdCake, MdOutlineEmojiPeople, MdEmail, MdCall } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

const InputValueType              =   {untouchedInput: 0, touchedValidInput: 1, touchedInvalidInput: 2}

function BaseInput(props) {

    const {touched, errors, getFieldProps}      =   useFormikContext();

    const emojis                    =   {
        "reservationDate": (<MdDateRange />),
        "reservationTime": (<MdAccessTime />),
        "reservationNumGuests": (<MdPeople />),
        "reservationOccasion": (<MdCake />),
        "reservationUserName": (<MdOutlineEmojiPeople />),
        "reservationUserMail": (<MdEmail />),
        "reservationUserPhone": (<MdCall />)
    }

  const checkInputStatus            =   (touched, error) => {
    switch(true) {
      case touched == null:             return InputValueType.untouchedInput;
      case error == null:               return InputValueType.touchedValidInput;
      default:                          return InputValueType.touchedInvalidInput;
    }
  }

  const helpMessage = () => {
    switch(checkInputStatus(touched[props.name], errors[props.name])) {
      case InputValueType.touchedInvalidInput:         return (
        <p className = "input-status">
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
        <p className = "input-status">
          {props.defaultMessage}
        </p>
      )
    }
  }

  const inputStatusChecker            =   () => {
    switch(true) {
      case !touched[props.name]:                return InputValueType.untouchedInput;
      case errors[props.name] == null:          return InputValueType.touchedValidInput;
      default:                                  return InputValueType.touchedInvalidInput;
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
            <label htmlFor = {props.name}>{props.labelText} {emojis[props.name]}</label>
            <input
            id={props.name}
            name={props.name}
            type={props.type}
            className={getStyle()}
            {...getFieldProps(props.name)}
            {...props.extra}
            />
        </p>
        {helpMessage()}
    </>
  );
};

export default BaseInput;