//import renderer from 'react-test-renderer';
import {screen, render} from '@testing-library/react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import BaseInput from './components/BaseInput';

jest.mock('formik');

it('has certain elements', () => {
/*
  const touched = {
    "reservationDate": false
  };
  const errors = {
    "reservationDate": undefined
  };
  const getFieldProps = {}
  console.log(touched);
  useFormikContext.mockReturnValue([touched, errors, getFieldProps]);
*/
/*
  jest.mock('formik', () => (
    {
      useFormikContext: jest.fn().mockReturnValue(
        {
          touched: {
            "reservationDate": false
          },
          errors: {
            "reservationDate": undefined
          },
          getFieldProps: jest.fn().mockReturnValue({})
        }
      )
    })
  );
*/
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
      (values, actions) => {}
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
              <BaseInput name = {'reservationDate'} type = {"date"} labelText = {"Date"} defaultMessage = {"Please give a date (required)"} extra = {{min: "2024-04-01", max: "2024-06-30"}} />
            </article>
          </section>
        </form>
        )
      }
    </Formik>
  );
  console.log(screen);
  expect(
    screen.getByRole('paragraph').getByLabelText('Date'),
  ).toBeInTheDocument();
});