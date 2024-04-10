import {createContext, useContext, useState} from "react";

const LittleLemonFormContext = createContext(undefined);

export const LittleLemonFormContextProvider = ({ children }) => {
    const [showForm, setShowForm] = useState(true);
    const [reservationDetails, setReservationDetails] = useState({
        reservationDate: '',
        reservationTime: 'placeholder',
        reservationNumGuests: '',
        reservationOccasion: 'placeholder',  
        reservationUserName: '',  
        reservationUserMail: '',  
        reservationUserPhone: ''
    });
    const timeTags          =   ['placeholder', 'eleven30', 'twelve15', 'one00', 'one45'];
    const occasionTags      =   ['placeholder', 'birthday', 'anniversary', 'hangout'];
    const timeTexts         =   {placeholder: 'Pick a time slot', eleven30: '11:30-12:15', twelve15: '12:15-13:00', one00: '13:00-13:45', one45: '13:45-14:30'};
    const occasionTexts     =   {placeholder: 'Occasion?', birthday: 'Birthday', anniversary: 'Anniversary', hangout: "Just hangin' out"};

  return (
    <LittleLemonFormContext.Provider value={{showForm, setShowForm, reservationDetails, setReservationDetails, timeTags, timeTexts, occasionTags, occasionTexts}}>
      {children}
    </LittleLemonFormContext.Provider>
  );
};

export const useLittleLemonFormContext = () => useContext(LittleLemonFormContext);