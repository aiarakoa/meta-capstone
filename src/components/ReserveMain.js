import './ReserveMain.css';
import BookingForm from './BookingForm';
import ReservationSummary from './ReservationSummary';
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";

function ReserveMain() {
  const {showForm}      = useLittleLemonFormContext();
  return (
    <>
        <main id = "main" className = "reserve-main">
          {showForm   ?   <BookingForm />   :   <ReservationSummary />}
        </main>
    </>
  );
}

export default ReserveMain;