import './OccasionsInput.css';
import React from "react";
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";
import { IconContext } from "react-icons"
import { MdCake } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

const InputValueType              =   {untouchedInput: 0, touchedValidInput: 1, touchedInvalidInput: 2}

function OccasionsInput(props) {
  const {occasionTags, occasionTexts} = useLittleLemonFormContext();

  const checkInputStatus            =   (touched, error) => {
    switch(true) {
      case touched == null:             return InputValueType.untouchedInput;
      case error == null:               return InputValueType.touchedValidInput;
      default:                          return InputValueType.touchedInvalidInput;
    }
  }

  const occasionMessage             =   () => {return helpMessage(props.touched, props.error, 'Please indicate whether it is a special occasion (required)')}

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
      <label htmlFor = {props.name}>Occasion <MdCake /></label>
      <select
        id={props.name}
        name={props.name}
        className={getStyle()}
        {...props.extra}
      >
        {occasionTags.map((tag, index) => (<option hidden = {index === 0 ? true : false} key = {tag} value = {tag}>{occasionTexts[tag]}</option>))}
      </select>
      {occasionMessage()}
    </>
  );
};

export default OccasionsInput;