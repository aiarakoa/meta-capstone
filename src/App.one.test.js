//import renderer from 'react-test-renderer';
import {screen, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';
import NumGuestsInput from './components/NumGuestsInput';

describe("Date input", () => {
  const isLoading                     =   false;
  const manageSubmit                  =   jest.fn();
  const invalidNumOfGuests            =   0;
  const validNumOfGuests              =   3;
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

  render(
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
      (values, actions) => {console.log("onSubmit => manageSubmit");manageSubmit(values)}
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
              <NumGuestsInput name = {'reservationNumGuests'} />
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
  );
  const guestsInput         =   screen.getByLabelText(/Number of guests/);

  it('Has a number input for the number of guests', () => {
    expect(guestsInput).toBeInTheDocument();
  });

  
  it('Is an input for which 0 is an invalid value', () => {
    fireEvent.change(guestsInput, {target: {value: invalidNumOfGuests}});
    expect(guestsInput).toBeInvalid();
  });

  it('Is an input for which 3 is a valid value', async () => {
    fireEvent.change(guestsInput, {target: {value: validNumOfGuests}});
    expect(guestsInput).toBeValid();
  });
});