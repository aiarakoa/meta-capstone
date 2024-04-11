import './ReserveForm.css';
import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit";
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";
import { IconContext } from "react-icons"
import { MdEmail , MdCall, MdDateRange, MdOutlineEmojiPeople, MdPeople, MdCake } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"
import TimeSlotsInput from "./TimeSlotsInput"

function ReserveForm() {
    const {isLoading, submit} = useSubmit();
    const {setShowForm, setReservationDetails, occasionTags, occasionTexts} = useLittleLemonFormContext();
    const untouchedInput                =   0;
    const touchedValidInput             =   1;
    const touchedInvalidInput           =   2;
    const validTimeSlotNames            =   ['eleven30', 'twelve15', 'one00', 'one45'];
    const vetInputValues                =   Yup.object({}).shape({
      reservationDate: Yup.string().required('Required'),
      reservationTime: Yup.string().oneOf(validTimeSlotNames, 'A time slot for your table is required').notOneOf(['fullybooked'], 'Please pick another date, sorry, we are full').required('Required'),
      reservationNumGuests: Yup.number().min(1,'At least 1 guest').max(10,'No more than 10 guests').required('Required'),
      reservationOccasion: Yup.string().notOneOf(['placeholder'], 'Specifying an occasion is required').required('Required'),  
      reservationUserName: Yup.string().required('Required'),  
      reservationUserMail: Yup.string().email('Invalid email address').required('Required'),  
      reservationUserPhone: Yup.string().matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g,
              "Invalid phone number, must be +XX XXX-XXX-XXXX"
            ).required('Required'),  
    });

    const dateMessage                 =   (touched, errors) => {return helpMessage(touched.reservationDate, errors.reservationDate, 'Please select a date (required)')}

    const numGuestsMessage            =   (touched, errors) => {return helpMessage(touched.reservationNumGuests, errors.reservationNumGuests, 'Please enter how many guests are expected (required)')}

    const occasionMessage             =   (touched, errors) => {return helpMessage(touched.reservationOccasion, errors.reservationOccasion, 'Please indicate whether it is a special occasion (required)')}

    const nameMessage                 =   (touched, errors) => {return helpMessage(touched.reservationUserName, errors.reservationUserName, 'Please give a contact name (required)')}

    const mailMessage                 =   (touched, errors) => {return helpMessage(touched.reservationUserMail, errors.reservationUserMail, 'Please give an e-mail (required)')}

    const phoneMessage                =   (touched, errors) => {return helpMessage(touched.reservationUserPhone, errors.reservationUserPhone, 'Please give a contact number (required)')}

    const helpMessage = (touched, error, messageText) => {
      switch(checkInputStatus(touched, error)) {
        case touchedInvalidInput:         return (
          <p>
            {error}
          </p>
        );
        case touchedValidInput:           return (
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

    const styleInputBorderColor       =   (touched, error) => {
      switch(checkInputStatus(touched, error)) {
        case touchedInvalidInput:         return 'red.600';
        case touchedValidInput:           return 'green.400';
        default:                          return 'grey.200';
      }
    }

    const styleInputBorderWidth       =   (touched, error) => {
      switch(checkInputStatus(touched, error)) {
        case touchedInvalidInput:
        case touchedValidInput:           return '.2vw';
        default:                          return '.1vw';
      }
    }

    const checkInputStatus            =   (touched, error) => {
      switch(true) {
        case touched == null:             return untouchedInput;
        case error == null:               return touchedValidInput;
        default:                          return touchedInvalidInput;
      }
    }

    return (
      <>
        <Formik         
          initialValues = {
            {
              reservationDate: '',
              reservationTime: 'placeholder',
              reservationNumGuests: '',
              reservationOccasion: 'placeholder',
              reservationUserName: '',
              reservationUserMail: '',
              reservationUserPhone: '',
            }
          }
          validationSchema = {vetInputValues}

          onSubmit = {
            (values, actions) => {
              let bookingDetails = {
                reservationDate: values.reservationDate,
                reservationTime: values.reservationTime,
                reservationNumGuests: values.reservationNumGuests,
                reservationOccasion: values.reservationOccasion,
                reservationUserName: values.reservationUserName,
                reservationUserMail: values.reservationUserMail,
                reservationUserPhone: values.reservationUserPhone,
              };
              submit("/", bookingDetails)
                .then(() => {
                  actions.resetForm(
                    {
                      values: {
                          reservationDate: '',
                          reservationTime: 'placeholder',
                          reservationNumGuests: '',
                          reservationOccasion: 'placeholder',  
                          reservationUserName: '',  
                          reservationUserMail: '',  
                          reservationUserPhone: '',  
                      }
                    }
                  );
    
                  setReservationDetails(bookingDetails);
                  setShowForm(false);    
                });
            }
          }
        >
          {
            ({touched, errors, handleSubmit, getFieldProps, dirty, isValid}) => (
              <form onSubmit={handleSubmit}>
                <h1>
                  Reservation
                </h1>
                <h4>
                  (all fields required)
                </h4>
                <section>
                  <h3>
                    Table details
                  </h3>
                  <p>
                    <label htmlFor = "reservationDate">Date <MdDateRange /></label>
                    <input
                      id="reservationDate"
                      name="reservationDate"
                      type="date"
                      min="2024-04-01"
                      max="2024-06-30"
                      borderColor={styleInputBorderColor(touched.reservationDate, errors.reservationDate)}
                      borderWidth={styleInputBorderWidth(touched.reservationDate, errors.reservationDate)}
                      {...getFieldProps("reservationDate")}
                    />
                    {dateMessage(touched, errors)}
                  </p>
                  <p>
                    <TimeSlotsInput name="reservationTime" />
                  </p>
                  <p>
                    <label htmlFor = "reservationNumGuests">Number of guests <MdPeople /></label>
                    <input
                      id="reservationNumGuests"
                      name="reservationNumGuests"
                      type="number"
                      borderColor={styleInputBorderColor(touched.reservationNumGuests, errors.reservationNumGuests)}
                      borderWidth={styleInputBorderWidth(touched.reservationNumGuests, errors.reservationNumGuests)}
                      {...getFieldProps("reservationNumGuests")}
                    />
                    {numGuestsMessage(touched, errors)}                    
                  </p>
                  <p>
                    <label htmlFor = "reservationOccasion">Occasion <MdCake /></label>
                    <select
                      id="reservationOccasion"
                      name="reservationOccasion"
                      borderColor={styleInputBorderColor(touched.reservationOccasion, errors.reservationOccasion)}
                      borderWidth={styleInputBorderWidth(touched.reservationOccasion, errors.reservationOccasion)}
                      {...getFieldProps("reservationOccasion")}
                    >
                      {occasionTags.map((tag, index) => (<option hidden = {index === 0 ? true : false} key = {tag} value = {tag}>{occasionTexts[tag]}</option>))};
                    </select>
                    {occasionMessage(touched, errors)}
                  </p>
                </section>
                <section>
                  <h3>
                    User details
                  </h3>
                  <p>
                    <label htmlFor = "reservationUserName">Name <MdOutlineEmojiPeople /></label>
                    <input
                      id="reservationUserName"
                      name="reservationUserName"
                      type="text"
                      borderColor={styleInputBorderColor(touched.reservationUserName, errors.reservationUserName)}
                      borderWidth={styleInputBorderWidth(touched.reservationUserName, errors.reservationUserName)}
                      {...getFieldProps("reservationUserName")}
                    />
                    {nameMessage(touched, errors)}
                  </p>
                  <p>
                    <label htmlFor = "reservationUserMail">E-mail <MdEmail /></label>
                    <input
                      id="reservationUserMail"
                      name="reservationUserMail"
                      type="email"
                      borderColor={styleInputBorderColor(touched.reservationUserMail, errors.reservationUserMail)}
                      borderWidth={styleInputBorderWidth(touched.reservationUserMail, errors.reservationUserMail)}
                      {...getFieldProps("reservationUserMail")}
                    />
                    {mailMessage(touched, errors)}
                  </p>
                  <p>
                    <label htmlFor = "reservationUserPhone">Phone <MdCall /></label>
                    <input
                      id="reservationUserPhone"
                      name="reservationUserPhone"
                      type="tel"
                      borderColor={styleInputBorderColor(touched.reservationUserPhone, errors.reservationUserPhone)}
                      borderWidth={styleInputBorderWidth(touched.reservationUserPhone, errors.reservationUserPhone)}
                      {...getFieldProps("reservationUserPhone")}
                    />
                    {phoneMessage(touched, errors)}
                  </p>
                </section>
                <section>
                  <p>
                    <input type="submit" disabled={!(isValid && dirty)} value = {isLoading  ? "Loading..."  : "Make your reservation"} />
                  </p>
                </section>
              </form>
            )
          }
        </Formik>
      </>
  );
}

export default ReserveForm;