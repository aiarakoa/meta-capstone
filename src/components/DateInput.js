import './DateInput.css';
import React from "react";
import BaseInput from "./BaseInput";

function DateInput(props) {
  return (
    <>
      <BaseInput name = {props.name} type = {"date"} labelText = {"Date"} defaultMessage = {"Please give a date (required)"} extra = {{min: "2024-04-01", max: "2024-06-30"}}/>
    </>
  );
};

export default DateInput;