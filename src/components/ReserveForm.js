import './ReserveForm.css';
import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  HStack,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
            reservationUserMail: Yup.string().email('Invalid email address').required('Required'),  
            reservationUserPhone: Yup.string().required('Required'),  
        }),
    });
    const handleDateChange = () => {
      console.log(formik.values.reservationDate);
    }

    const showAvailableTimeSlots = () => {
      return [
        (<option selected="true" hidden="true" key="placeholder" value="placeholder">Pick a time slot</option>),
        (<option key="eleven30" value="eleven30">11:30-12:15</option>),
        (<option key="twelve15" value="twelve15">12:15-13:00</option>),
        (<option key="one00" value="one00">13:00-13:45</option>),
        (<option key="one45" value="one45">13:45-14:30</option>)
      ]
    }

    const dateMessage       = () => {return helpMessage(formik.errors.reservationDate, formik.touched.reservationDate, 'Please select a date (required)')}

    const timeMessage       = () => {return helpMessage(formik.errors.reservationTime, formik.touched.reservationTime, 'Please select a time slot (required)')}

    const numGuestsMessage  = () => {return helpMessage(formik.errors.reservationNumGuests, formik.touched.reservationNumGuests, 'Please enter how many guests are expected (required)')}

    const occasionMessage   = () => {return helpMessage(formik.errors.reservationOccasion, formik.touched.reservationOccasion, 'Please indicate whether it is a special occasion (required)')}

    const nameMessage       = () => {return helpMessage(formik.errors.reservationUserName, formik.touched.reservationUserName, 'Please give a contact name (required)')}

    const mailMessage       = () => {return helpMessage(formik.errors.reservationUserMail, formik.touched.reservationUserMail, 'Please give an e-mail (required)')}

    const phoneMessage      = () => {return helpMessage(formik.errors.reservationUserPhone, formik.touched.reservationUserPhone, 'Please give a contact number (required)')}

    const helpMessage = (error, touched, messageText) => {
      switch(true) {
        case !!error: return (
          <FormErrorMessage>
            {error}
          </FormErrorMessage>
        );
        case touched: return (
          <FormHelperText>
            <IconContext.Provider
              value={{color: '#00cc00'}}>
              <IoCheckmarkCircle />
            </IconContext.Provider>
          </FormHelperText>
        );
        default: return (
          <FormHelperText>
            {messageText}
          </FormHelperText>
        )
      }
    }

    return (
        <>
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
          <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.reservationDate && !!formik.errors.reservationDate}>
                <HStack>
                  <FormLabel htmlFor="reservationDate">Date</FormLabel>
                  <MdDateRange />
                </HStack>
                <Input
                  id="reservationDate"
                  name="reservationDate"
                  type="date"
                  borderColor={formik.touched.reservationDate ? 'green.400'  : 'grey.200'}
                  borderWidth={formik.touched.reservationDate ? '.3vw'  : '.1vw'}
                  _invalid="red.600"
                  _focus="blue.500"
                  _hover="orange.100"
                  onChange={handleDateChange}
                  {...formik.getFieldProps("reservationDate")}
                />
                {dateMessage()}
              </FormControl>
              <FormControl isInvalid={formik.touched.reservationTime && !!formik.errors.reservationTime}>
                <HStack>
                  <FormLabel htmlFor="reservationTime">Time</FormLabel>
                  <MdAccessTime />
                </HStack>
                <Select
                  id="reservationTime"
                  name="reservationTime"
                  {...formik.getFieldProps("reservationTime")}
                >
                  {showAvailableTimeSlots()}
                </Select>
                {timeMessage()}
              </FormControl>
              <FormControl isInvalid={formik.touched.reservationNumGuests && !!formik.errors.reservationNumGuests}>
                <HStack>
                  <FormLabel htmlFor="reservationNumGuests">Number of guests</FormLabel>
                  <MdPeople />
                </HStack>
                <NumberInput  
                    name="reservationNumGuests"
                    id="reservationNumGuests"
                    min={1}
                    max={10}>
                  <NumberInputField/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {numGuestsMessage()}
              </FormControl>
              <FormControl isInvalid={formik.touched.reservationOccasion && !!formik.errors.reservationOccasion}>
                <HStack>
                  <FormLabel htmlFor="reservationOccasion">Occasion</FormLabel>
                  <MdCake />
                </HStack>
                <Select
                  id="reservationOccasion"
                  name="reservationOccasion"
                  {...formik.getFieldProps("reservationOccasion")}
                >
                  <option selected="true" hidden="true" key="placeholder" value="placeholder">Occasion?</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="hangout">Just hangin' out!</option>
                </Select>
                {occasionMessage()}
              </FormControl>
              <FormControl isInvalid={formik.touched.reservationUserName && !!formik.errors.reservationUserName}>
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
                {nameMessage()}
              </FormControl>
              <FormControl isInvalid={formik.touched.reservationUserMail && !!formik.errors.reservationUserMail}>
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
                {mailMessage()}
              </FormControl>
              <FormControl isInvalid={formik.touched.reservationUserPhone && !!formik.errors.reservationUserPhone}>
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
                {phoneMessage()}
              </FormControl>
              <Button type="submit" colorScheme="#f4ce14" color="black" width="full" isDisabled={!(formik.isValid && formik.dirty)}>
                {isLoading  ? "Loading..."  : "Make your reservation"}
              </Button>
{/*               <Box
                as='button'
                height='24px'
                lineHeight='1.2'
                transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                border='1px'
                px='8px'
                borderRadius='2px'
                fontSize='14px'
                fontWeight='semibold'
                bg='#f5f6f7'
                borderColor='#ccd0d5'
                color='#4b4f56'
                _hover={{ bg: '#ebedf0' }}
                _active={{
                  bg: '#dddfe2',
                  transform: 'scale(0.98)',
                  borderColor: '#bec3c9',
                }}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
              >
                Join Group
              </Box>
 */}
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