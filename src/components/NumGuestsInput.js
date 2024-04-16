import React from "react";
import BaseInput from "./BaseInput";

function NumGuestsInput(props) {
  return (
    <>
      <BaseInput name = {props.name} type = {"number"} labelText = {"Number of guests"} defaultMessage = {"Please enter how many guests are expected (required, between 1 and 10)"} extra = {{min: "1", max: "10"}} />
    </>
  );
};

export default NumGuestsInput;