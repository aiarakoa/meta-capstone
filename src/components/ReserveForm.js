import './ReserveForm.css';
import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit";
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";
import DateInput from './DateInput';
import TimeSlotsInput from "./TimeSlotsInput";
import NumGuestsInput from './NumGuestsInput';
import OccasionsInput from './OccasionsInput';
import UserNameInput from './UserNameInput';
import UserMailInput from './UserMailInput';
import UserPhoneInput from './UserPhoneInput';

function ReserveForm() {
    const {isLoading, submit} = useSubmit();
    const {setShowForm, setReservationDetails} = useLittleLemonFormContext();
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
                  <article>
                    <DateInput name="reservationDate" />
                  </article>
                  <article>
                    <TimeSlotsInput name="reservationTime" />
                  </article>
                  <article>
                    <NumGuestsInput name="reservationNumGuests" />
                    </article>
                  <article>
                    <OccasionsInput name="reservationOccasion" />
                  </article>
                </section>
                <section>
                  <h3>
                    User details
                  </h3>
                  <article>
                    <UserNameInput name="reservationUserName" />
                  </article>
                  <article>
                    <UserMailInput name="reservationUserMail" />
                  </article>
                  <article>
                    <UserPhoneInput name="reservationUserPhone" />
                  </article>
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