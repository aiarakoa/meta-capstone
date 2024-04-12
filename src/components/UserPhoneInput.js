import React from "react";
import BaseInput from "./BaseInput";

function UserPhoneInput(props) {
  return (
    <>
      <BaseInput name = {props.name} type = {"tel"} labelText = {"Phone"} defaultMessage = {"Please give a contact number (required)"}/>
    </>
  );
};

export default UserPhoneInput;