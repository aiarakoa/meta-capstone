import './UserMailInput.css';
import React from "react";
import BaseInput from "./BaseInput";

function UserMailInput(props) {
  return (
    <>
      <BaseInput name = {props.name} type = {"email"} labelText = {"E-mail"} defaultMessage = {"Please give an e-mail (required)"}/>
    </>
  );
};

export default UserMailInput;