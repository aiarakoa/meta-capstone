import './ReserveMain.css';
import ReserveForm from './ReserveForm';
import ReservationSummary from './ReservationSummary';
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";

function ReserveMain() {
  const {showForm}      = useLittleLemonFormContext();
  return (
    <>
        <main className = "reserve-main">
          {showForm   ?   <ReserveForm />   :   <ReservationSummary />}
        </main>
    </>
  );
}

export default ReserveMain;