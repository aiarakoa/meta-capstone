import './ReserveForm.css';
import React, {useReducer} from "react";
import { Formik, useFormikContext, useField } from "formik";
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
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";
import {fetchAPI} from "../helpers/PseudoAPI";
import FullScreenSection from "./FullScreenSection";
import { IconContext } from "react-icons"
import { MdEmail , MdCall, MdDateRange, MdAccessTime, MdOutlineEmojiPeople, MdPeople, MdCake } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

// function doNothing() {}

const InputValueType              =   {untouchedInput: 0, touchedValidInput: 1, touchedInvalidInput: 2}

function MyTimeSlotsField(props) {
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
        <FormErrorMessage>
          {meta.error}
        </FormErrorMessage>
      );
      case InputValueType.touchedValidInput:           return (
        <FormHelperText>
          <IconContext.Provider
            value={{color: '#00cc00'}}>
            <IoCheckmarkCircle />
          </IconContext.Provider>
        </FormHelperText>
      );
      default:                          return (
        <FormHelperText>
          {meta.value === 'fullybooked' ? `Sorry, we are full, please pick another day (required)`  : `Please select a time slot (required)`}
        </FormHelperText>
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

  const styleBorderColor       =   () => {
    switch(inputStatusChecker()) {
      case InputValueType.touchedInvalidInput:         return 'red.600';
      case InputValueType.touchedValidInput:           return 'green.400';
      default:                          return 'grey.200';
    }
  }
  
  const styleBorderWidth       =   () => {
    switch(inputStatusChecker()) {
      case InputValueType.touchedInvalidInput:
      case InputValueType.touchedValidInput:           return '.2vw';
      default:                          return '.1vw';
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
    // let isCurrent = true;
    console.log(`Checking available slots for date: ${reservationDate}`)
    fetchAPI(reservationDate)
    .then(response => dispatch({type: 'someCase', availableTimeSlots: response}))
    .catch(err => {
      console.warn(err);
    });

    helpers.setTouched(false).then(() => state.timeSlots.length > 2     ?   setFieldValue(props.name, 'placeholder')  : setFieldValue(props.name, 'fullybooked'));
    // console.log(`Hiya effect in time! Date: ${reservationDate}`);
    // console.log(`Input ${props.name} has value ${field.value}`);
    // console.log(state.timeSlots);
    // console.log(meta)
    // your business logic around when to fetch goes here.
    // if (textA.trim() !== '' && textB.trim() !== '') {
    //   fetchNewTextC(textA, textB).then((textC) => {
    //     if (!!isCurrent) {
    //       // prevent setting old values
    //       setFieldValue(props.name, textC);
    //     }
    //   });
    // }
    return () => {};
  }, [reservationDate, setFieldValue, props.name, helpers, state.timeSlots.length]);

  return (
    <>
      <Flex  align="center">
        <FormLabel htmlFor={props.name} style={{margin: '1vw 1vw 1vw 0vw'}}>Time</FormLabel>
        <MdAccessTime />
      </Flex>
      <Select
        id={props.name}
        name={props.name}
        borderColor={styleBorderColor(meta.touched, meta.error)}
        borderWidth={styleBorderWidth(meta.touched, meta.error)}
        {...props}
        {...field}
      >
        {state.timeSlots}
      </Select>
      {timeSlotMessage()}
    </>
  );
};

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
                            min="2024-04-01"
                            max="2024-06-30"
                            borderColor={styleInputBorderColor(touched.reservationDate, errors.reservationDate)}
                            borderWidth={styleInputBorderWidth(touched.reservationDate, errors.reservationDate)}
                            {...getFieldProps("reservationDate")}
                          />
                          {dateMessage(touched, errors)}
                        </FormControl>
                        <FormControl isInvalid={touched.reservationTime && !!errors.reservationTime}>
                          <MyTimeSlotsField name="reservationTime" />
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
                            {occasionTags.map((tag, index) => (<option hidden = {index === 0 ? true : false} key = {tag} value = {tag}>{occasionTexts[tag]}</option>))};
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