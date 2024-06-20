import './TimeSlotsInput.css';
import React, {useReducer} from "react";
import { useFormikContext, useField } from "formik";
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";
import {fetchAPI} from "../helpers/PseudoAPI";
import BaseSelect from "./BaseSelect";

function TimeSlotsInput(props) {
  const {timeTags, timeTexts} = useLittleLemonFormContext();

  const {
    values: { reservationDate },
    setFieldValue,
  } = useFormikContext();
  const [field, meta, helpers] = useField(props);

  const initialTimeSlots = {timeSlots: timeTags.map((tag, index) => (<option hidden = {index === 0 ? true : false} key = {tag} value = {tag}>{timeTexts[tag]}</option>))};

  const getDefaultMessage = () => {return meta.value === 'fullybooked' ? `Sorry, we are full, please pick another day (required)`  : `Please select a time slot (required)`}


  const timeReducer = (state, action) => {
    switch(action.type) {
      case 'someCase': 
        let tempTimeSlots = initialTimeSlots.timeSlots.filter(timeSlot => action.availableTimeSlots.includes(timeSlot.key));
        tempTimeSlots.length > 0
          ? tempTimeSlots.unshift((<option hidden={true} key="placeholder" value="placeholder">Pick a time slot</option>))
          : tempTimeSlots.push((<option hidden={true} key="fullybooked" value="fullybooked">We are full :-(</option>));
        return {...state, timeSlots: tempTimeSlots};
      default: throw Error(`Unknown action: ${action.type}`);
    }
  }

  const [state, dispatch] = useReducer(timeReducer, initialTimeSlots);

  React.useEffect(() => {
    console.log(`Checking available slots for date: ${reservationDate}`)
    fetchAPI(reservationDate)
    .then(response => dispatch({type: 'someCase', availableTimeSlots: response}))
    .catch(err => {
      console.warn(err);
    });

    helpers.setTouched(false).then(() => state.timeSlots.length > 2     ?   setFieldValue(props.name, 'placeholder')  : setFieldValue(props.name, 'fullybooked'));
    return () => {};
  }, [reservationDate, setFieldValue, props.name, helpers, state.timeSlots.length]);

  return (
    <>
      <BaseSelect name = {props.name} labelText = {"Time"} defaultMessage = {getDefaultMessage()} options = {state.timeSlots} tags = {timeTags} texts = {timeTexts} extra = {{...field}}/>
    </>
  );
};

export default TimeSlotsInput;