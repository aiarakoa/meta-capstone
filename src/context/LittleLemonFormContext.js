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

  return (
    <LittleLemonFormContext.Provider value={{showForm, setShowForm, reservationDetails, setReservationDetails}}>
      {children}
    </LittleLemonFormContext.Provider>
  );
};

export const useLittleLemonFormContext = () => useContext(LittleLemonFormContext);