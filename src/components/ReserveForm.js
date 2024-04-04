import './ReserveForm.css';
import React from "react";
import { Formik, useFormikContext } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";
import FullScreenSection from "./FullScreenSection";
import { IconContext } from "react-icons"
import { MdEmail , MdCall, MdDateRange, MdAccessTime, MdOutlineEmojiPeople, MdPeople, MdCake } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

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
    const untouchedInput                =   0;
    const touchedValidInput             =   1;
    const touchedInvalidInput           =   2;
    const vetInputValues                =   Yup.object({}).shape({
      reservationDate: Yup.string().required('Required'),
      reservationTime: Yup.string().required('Required'),
      reservationNumGuests: Yup.number().min(1,'At least 1 guest').max(10,'No more than 10 guests').required('Required'),
      reservationOccasion: Yup.string().required('Required'),  
      reservationUserName: Yup.string().required('Required'),  
      reservationUserMail: Yup.string().email('Invalid email address').required('Required'),  
      reservationUserPhone: Yup.string().required('Required'),  
    });

    const showAvailableTimeSlots = () => {
      return [
        (<option hidden={true} key="placeholder" value="placeholder">Pick a time slot</option>),
        (<option key="eleven30" value="eleven30">11:30-12:15</option>),
        (<option key="twelve15" value="twelve15">12:15-13:00</option>),
        (<option key="one00" value="one00">13:00-13:45</option>),
        (<option key="one45" value="one45">13:45-14:30</option>)
      ]
    }

    const dateMessage                 =   (touched, errors) => {return helpMessage(touched.reservationDate, errors.reservationDate, 'Please select a date (required)')}

    const timeMessage                 =   (touched, errors) => {return helpMessage(touched.reservationTime, errors.reservationTime, 'Please select a time slot (required)')}

    const numGuestsMessage            =   (touched, errors) => {return helpMessage(touched.reservationNumGuests, errors.reservationNumGuests, 'Please enter how many guests are expected (required)')}

    const occasionMessage             =   (touched, errors) => {return helpMessage(touched.reservationOccasion, errors.reservationOccasion, 'Please indicate whether it is a special occasion (required)')}

    const nameMessage                 =   (touched, errors) => {return helpMessage(touched.reservationUserName, errors.reservationUserName, 'Please give a contact name (required)')}

    const mailMessage                 =   (touched, errors) => {return helpMessage(touched.reservationUserMail, errors.reservationUserMail, 'Please give an e-mail (required)')}

    const phoneMessage                =   (touched, errors) => {return helpMessage(touched.reservationUserPhone, errors.reservationUserPhone, 'Please give a contact number (required)')}

    const helpMessage = (touched, error, messageText) => {
      switch(checkInputStatus(touched, error)) {
        case touchedInvalidInput:         return (
          <FormErrorMessage>
            {error}
          </FormErrorMessage>
        );
        case touchedValidInput:           return (
          <FormHelperText>
            <IconContext.Provider
              value={{color: '#00cc00'}}>
              <IoCheckmarkCircle />
            </IconContext.Provider>
          </FormHelperText>
        );
        default:                          return (
          <FormHelperText>
            {messageText}
          </FormHelperText>
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
        case touchedValidInput:           return '.3vw';
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
              reservationTime: '',
              reservationNumGuests: '',
              reservationOccasion: '',
              reservationUserName: '',
              reservationUserMail: '',
              reservationUserPhone: '',
            }
          }
          validationSchema = {vetInputValues}

          onSubmit = {
            (values, actions) => {
              submit("/", {firstName: values.firstName});
/* 
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
*/
/*               
              submit("/", {firstName: values.firstName});
              let [type, message]         =   destructureResponse(response);
              onOpen(type, message);
              response.type === 'error'   ?   doNothing()                                                     :   actions.resetForm(
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
 */
            }
          }
        >
          {
            ({touched, errors, handleSubmit, getFieldProps, dirty, isValid}) => (
              <FullScreenSection
              backgroundColor="white"
              py={16}
              spacing={8}
              >
                <VStack w="60%" p={32} alignItems="flex-start">
                  <Heading as="h1" id="reservation-section" fontSize="2.5vw">
                    Reservation
                  </Heading>
                  <Heading as="h4" id="reservation-section" fontSize="1.25vw">
                    (all fields required)
                  </Heading>
                  <Box p={6} rounded="md" w="100%">
                    <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isInvalid={touched.reservationDate && !!errors.reservationDate}>
                          <Flex  align="center">
                            <FormLabel htmlFor="reservationDate" style={{margin: '1vw 1vw 1vw 0vw'}}>Date</FormLabel>                  
                            <MdDateRange />
                          </Flex>
                          <Input
                            id="reservationDate"
                            name="reservationDate"
                            type="date"
                            borderColor={styleInputBorderColor(touched.reservationDate, errors.reservationDate)}
                            borderWidth={styleInputBorderWidth(touched.reservationDate, errors.reservationDate)}
                            {...getFieldProps("reservationDate")}
                          />
                          {dateMessage(touched, errors)}
                        </FormControl>
                        <FormControl isInvalid={touched.reservationTime && !!errors.reservationTime}>
                          <Flex  align="center">
                            <FormLabel htmlFor="reservationTime" style={{margin: '1vw 1vw 1vw 0vw'}}>Time</FormLabel>
                            <MdAccessTime />
                          </Flex>
                          <Select
                            id="reservationTime"
                            name="reservationTime"
                            borderColor={styleInputBorderColor(touched.reservationTime, errors.reservationTime)}
                            borderWidth={styleInputBorderWidth(touched.reservationTime, errors.reservationTime)}
                            {...getFieldProps("reservationTime")}
                          >
                            {showAvailableTimeSlots()}
                          </Select>
                          {timeMessage(touched, errors)}
                        </FormControl>
                        <FormControl isInvalid={touched.reservationNumGuests && !!errors.reservationNumGuests}>
                          <Flex  align="center">
                            <FormLabel htmlFor="reservationNumGuests" style={{margin: '1vw 1vw 1vw 0vw'}}>Number of guests</FormLabel>
                            <MdPeople />
                          </Flex>
                          <Input
                            id="reservationNumGuests"
                            name="reservationNumGuests"
                            type="number"
                            borderColor={styleInputBorderColor(touched.reservationNumGuests, errors.reservationNumGuests)}
                            borderWidth={styleInputBorderWidth(touched.reservationNumGuests, errors.reservationNumGuests)}
                            {...getFieldProps("reservationNumGuests")}
                          />
                          {numGuestsMessage(touched, errors)}
                        </FormControl>
                        <FormControl isInvalid={touched.reservationOccasion && !!errors.reservationOccasion}>
                          <Flex  align="center">
                            <FormLabel htmlFor="reservationOccasion" style={{margin: '1vw 1vw 1vw 0vw'}}>Occasion</FormLabel>
                            <MdCake />
                          </Flex>
                          <Select
                            id="reservationOccasion"
                            name="reservationOccasion"
                            borderColor={styleInputBorderColor(touched.reservationOccasion, errors.reservationOccasion)}
                            borderWidth={styleInputBorderWidth(touched.reservationOccasion, errors.reservationOccasion)}
                            {...getFieldProps("reservationOccasion")}
                          >
                            <option hidden={true} key="placeholder" value="placeholder">Occasion?</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="hangout">Just hangin' out!</option>
                          </Select>
                          {occasionMessage(touched, errors)}
                        </FormControl>
                        <FormControl isInvalid={touched.reservationUserName && !!errors.reservationUserName}>
                          <Flex  align="center">
                            <FormLabel htmlFor="reservationUserName" style={{margin: '1vw 1vw 1vw 0vw'}}>User Name</FormLabel>
                            <MdOutlineEmojiPeople />
                          </Flex>
                          <Input
                            id="reservationUserName"
                            name="reservationUserName"
                            type="text"
                            borderColor={styleInputBorderColor(touched.reservationUserName, errors.reservationUserName)}
                            borderWidth={styleInputBorderWidth(touched.reservationUserName, errors.reservationUserName)}
                            {...getFieldProps("reservationUserName")}
                          />
                          {nameMessage(touched, errors)}
                        </FormControl>
                        <FormControl isInvalid={touched.reservationUserMail && !!errors.reservationUserMail}>
                          <Flex  align="center">
                            <FormLabel htmlFor="reservationUserMail" style={{margin: '1vw 1vw 1vw 0vw'}}>User Mail</FormLabel>
                            <MdEmail />
                          </Flex>
                          <Input
                            id="reservationUserMail"
                            name="reservationUserMail"
                            type="email"
                            borderColor={styleInputBorderColor(touched.reservationUserMail, errors.reservationUserMail)}
                            borderWidth={styleInputBorderWidth(touched.reservationUserMail, errors.reservationUserMail)}
                            {...getFieldProps("reservationUserMail")}
                          />
                          {mailMessage(touched, errors)}
                        </FormControl>
                        <FormControl isInvalid={touched.reservationUserPhone && !!errors.reservationUserPhone}>
                          <Flex  align="center">
                            <FormLabel htmlFor="reservationUserPhone" style={{margin: '1vw 1vw 1vw 0vw'}}>User Phone</FormLabel>
                            <MdCall />
                          </Flex>
                          <Input
                            id="reservationUserPhone"
                            name="reservationUserPhone"
                            type="tel"
                            borderColor={styleInputBorderColor(touched.reservationUserPhone, errors.reservationUserPhone)}
                            borderWidth={styleInputBorderWidth(touched.reservationUserPhone, errors.reservationUserPhone)}
                            {...getFieldProps("reservationUserPhone")}
                          />
                          {phoneMessage(touched, errors)}
                        </FormControl>
                        <Button type="submit" colorScheme="#f4ce14" color="black" width="full" isDisabled={!(isValid && dirty)}>
                          {isLoading  ? "Loading..."  : "Make your reservation"}
                        </Button>
                      </VStack>
                    </form>
                  </Box>
                </VStack>
              </FullScreenSection>
            )
          }
        </Formik>
      </>
  );
}

export default ReserveForm;