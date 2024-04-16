import './BasicInput.css';
import React from "react";
import { useFormikContext } from "formik";
import { MdDateRange, MdAccessTime, MdPeople, MdCake, MdOutlineEmojiPeople, MdEmail, MdCall } from "react-icons/md"

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
      <label htmlFor = {props.name}>{props.labelText} {emojis[props.name]}</label>
      <input
      id={props.name}
      name={props.name}
      type={props.type}
      className={getStyle()}
      {...getFieldProps(props.name)}
      {...props.extra}
      />
    </>
  );
};

export default BaseInput;