import './OccassionsInput.css';
import React from "react";
import BaseSelect from "./BaseSelect";
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";

function OccasionsInput(props) {
  const {occasionTags, occasionTexts} = useLittleLemonFormContext();
  const occasionOptions = occasionTags.map((tag, index) => (<option hidden = {index === 0 ? true : false} key = {tag} value = {tag}>{occasionTexts[tag]}</option>));

  return (
    <>
      <BaseSelect name = {props.name} labelText = {"Occasion"} defaultMessage = {"Please indicate whether it is a special occasion (required)"} options = {occasionOptions}/>
    </>
  );
};

export default OccasionsInput;
