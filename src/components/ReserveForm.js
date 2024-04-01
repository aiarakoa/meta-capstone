import './ReserveForm.css';
import React, {useEffect} from "react";
import { useFormik } from "formik";
/* import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
 */import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

function doNothing() {}

function destructureResponse(response) {
    let type, message   =   null;
    response == null                            ?   type = ''                                                   :   type = response.type;
    response == null                            ?   message = 'Something went wrong, please try again later!'   :   message = response.message;
    return [type, message];
}

function ReserveForm() {
    const {isLoading, response, submit} = useSubmit();
    const {onOpen} = useAlertContext();
/*     const formik = useFormik({
        initialValues: {
          reservationDate: '',
          reservationTime: '',
          reservationNumGuests: '',
          reservationOccasion: '',
          reservationUserName: '',
          reservationUserMail: '',
          reservationUserPhone: '',
        },
        onSubmit: (values, actions) => {
            submit("/", {firstName: values.firstName});
            let [type, message]         =   destructureResponse(response);
            onOpen(type, message);
            response.type === 'error'   ?   doNothing()                                                     :   actions.resetForm({
                values: {
                    reservationDate: '',
                    reservationTime: '',
                    reservationNumGuests: '',
                    reservationOccasion: '',  
                    reservationUserName: '',  
                    reservationUserMail: '',  
                    reservationUserPhone: '',  
                }
            });
        },
        validationSchema: Yup.object({}).shape({ */
/*
          firstName: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          type: Yup.string().default(undefined).optional().nullable(),
          comment: Yup.string().min(25, 'Must be at least 25 characters').required('Required'),
*/
/*             reservationDate: Yup.string().required('Required'),
            reservationTime: Yup.string().required('Required'),
            reservationNumGuests: Yup.string().required('Required'),
            reservationOccasion: Yup.string().required('Required'),  
            reservationUserName: Yup.string().required('Required'),  
            reservationUserMail: Yup.string().required('Required'),  
            reservationUserPhone: Yup.string().required('Required'),  
        }),
    }); */

    return (
        <>
            <span>Hiya!</span>
{/*             <form>
                <label for="res-date">Choose date</label>
                <input type="date" id="res-date" />
                <label for="res-time">Choose time</label>
                <select id="res-time ">
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                </select>
                <label for="guests">Number of guests</label>
                <input type="number" placeholder="1" min="1" max="10" id="guests" />
                <label for="occasion">Occasion</label>
                <select id="occasion">
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                <input type="submit" value="Make Your reservation" />
            </form>
 */}
        </>
    );
}

export default ReserveForm;