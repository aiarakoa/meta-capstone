import './UserNameInput.css';
import React from "react";
import BaseInput from "./BaseInput";

function UserNameInput(props) {
  return (
    <>
      <BaseInput name = {props.name} type = {"text"} labelText = {"Name"} defaultMessage = {"Please give a contact name (required)"}/>
    </>
  );
};

export default UserNameInput;