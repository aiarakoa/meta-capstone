import './ReserveForm.css';
import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  HStack,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";
import FullScreenSection from "./FullScreenSection";
import { MdEmail , MdCall, MdDateRange, MdAccessTime, MdOutlineEmojiPeople, MdPeople, MdCake } from "react-icons/md"

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
     const formik = useFormik({
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
        validationSchema: Yup.object({}).shape({
/*
          firstName: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          type: Yup.string().default(undefined).optional().nullable(),
          comment: Yup.string().min(25, 'Must be at least 25 characters').required('Required'),
*/
             reservationDate: Yup.string().required('Required'),
            reservationTime: Yup.string().required('Required'),
            reservationNumGuests: Yup.string().required('Required'),
            reservationOccasion: Yup.string().required('Required'),  
            reservationUserName: Yup.string().required('Required'),  
            reservationUserMail: Yup.string().required('Required'),  
            reservationUserPhone: Yup.string().required('Required'),  
        }),
    });

    return (
        <>
    <FullScreenSection
      backgroundColor="white"
      py={16}
      spacing={8}
    >
      <VStack w="60%" p={32} alignItems="flex-start">
        <Heading as="h1" id="reservation-section">
          Reservation
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                <HStack>
                  <FormLabel htmlFor="reservationDate">Date</FormLabel>
                  <MdDateRange />
                </HStack>
                <Input
                  id="reservationDate"
                  name="reservationDate"
                  type="date"
                  {...formik.getFieldProps("reservationDate")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel htmlFor="reservationTime">Time</FormLabel>
                  <MdAccessTime />
                </HStack>
                <Select
                  id="reservationTime"
                  name="reservationTime"
                  {...formik.getFieldProps("reservationTime")}
                >
                  <option value="eleven-30">11:30-12:15</option>
                  <option value="twelve-15">12:15-13:00</option>
                  <option value="one-o-clock">13:00-13:45</option>
                  <option value="one-45">13:45-14:30</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                <HStack>
                  <FormLabel htmlFor="reservationNumGuests">Number of guests</FormLabel>
                  <MdPeople />
                </HStack>
                <Input
                  id="reservationNumGuests"
                  name="reservationNumGuests"
                  type="number"
                  {...formik.getFieldProps("reservationNumGuests")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel htmlFor="reservationOccasion">Occasion</FormLabel>
                  <MdCake />
                </HStack>
                <Select
                  id="reservationOccasion"
                  name="reservationOccasion"
                  {...formik.getFieldProps("reservationOccasion")}
                >
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="hangout">Just hangin' out!</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                <HStack>
                  <FormLabel htmlFor="reservationUserName">User Name</FormLabel>
                  <MdOutlineEmojiPeople />
                </HStack>
                <Input
                  id="reservationUserName"
                  name="reservationUserName"
                  type="text"
                  {...formik.getFieldProps("reservationUserName")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                <HStack>
                  <FormLabel htmlFor="reservationUserMail">User Mail</FormLabel>
                  <MdEmail />
                </HStack>
                <Input
                  id="reservationUserMail"
                  name="reservationUserMail"
                  type="email"
                  {...formik.getFieldProps("reservationUserMail")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                <HStack>
                  <FormLabel htmlFor="reservationUserPhone">User Phone</FormLabel>
                  <MdCall />
                </HStack>
                <Input
                  id="reservationUserPhone"
                  name="reservationUserPhone"
                  type="tel"
                  {...formik.getFieldProps("reservationUserPhone")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="#f4ce14" color="black" width="full">
                {isLoading  ? "Loading..."  : "Make your reservation"}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>

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