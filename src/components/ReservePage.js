import './ReservePage.css';
import ReserveMain from './ReserveMain';
import {LittleLemonFormContextProvider} from '../context/LittleLemonFormContext';

function ReservePage() {
  return (
    <>
      <LittleLemonFormContextProvider>
        <ReserveMain />
      </LittleLemonFormContextProvider>
    </>
  );
}

export default ReservePage;