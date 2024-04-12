import './TimeSlotsInput.css';
import React, {useReducer} from "react";
import { useFormikContext, useField } from "formik";
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";
import {fetchAPI} from "../helpers/PseudoAPI";
import { IconContext } from "react-icons"
import { MdAccessTime } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

const InputValueType              =   {untouchedInput: 0, touchedValidInput: 1, touchedInvalidInput: 2}

function TimeSlotsInput(props) {
  const {timeTags, timeTexts} = useLittleLemonFormContext();

  const {
    values: { reservationDate },
    setFieldValue,
  } = useFormikContext();
  const [field, meta, helpers] = useField(props);

  const initialTimeSlots = {timeSlots: timeTags.map((tag, index) => (<option hidden = {index === 0 ? true : false} key = {tag} value = {tag}>{timeTexts[tag]}</option>))};

  const timeSlotMessage = () => {
    switch(inputStatusChecker()) {
      case InputValueType.touchedInvalidInput:         return (
        <p>
          {meta.error}
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
          {meta.value === 'fullybooked' ? `Sorry, we are full, please pick another day (required)`  : `Please select a time slot (required)`}
        </p>
      )
    }
  }

  const inputStatusChecker            =   () => {
    switch(true) {
      case !meta.touched:               return InputValueType.untouchedInput;
      case meta.error == null:          return InputValueType.touchedValidInput;
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
      <p>
        <label htmlFor = {props.name}>Time <MdAccessTime /></label>
        <select
          id={props.name}
          name={props.name}
          className={getStyle()}
          {...props}
          {...field}
        >
          {state.timeSlots}
        </select>
      </p>
      {timeSlotMessage()}
    </>
  );
};

export default TimeSlotsInput;