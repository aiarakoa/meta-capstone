import './ReservationSummary.css';
import {useLittleLemonFormContext} from "../context/LittleLemonFormContext";

function ReservationSummary() {
    const {setShowForm, reservationDetails, timeTexts, occasionTexts}   =   useLittleLemonFormContext();
    const goToReservationForm                                           =   () => {setShowForm(true);}
    return (
        <>
            <article className = "reservation-summary-article">
                <h3>
                    Your reservation is confirmed!
                </h3>
                <h5>
                    (you'll be receiving an e-mail with the following details)
                </h5>
                <table className = "reservation-details-table">
                    <tbody>
                        <tr>
                            <td>
                                Date:
                            </td>
                            <td>
                                {reservationDetails.reservationDate}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Time:
                            </td>
                            <td>
                                {timeTexts[reservationDetails.reservationTime]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Number of guests:
                            </td>
                            <td>
                                {reservationDetails.reservationNumGuests}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Occasion:
                            </td>
                            <td>
                                {occasionTexts[reservationDetails.reservationOccasion]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                User name:
                            </td>
                            <td>
                                {reservationDetails.reservationUserName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                User e-mail:
                            </td>
                            <td>
                                {reservationDetails.reservationUserMail}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                User phone:
                            </td>
                            <td>
                                {reservationDetails.reservationUserPhone}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick = {goToReservationForm}>
                                    Make another reservation
                                </button>
                            </td>
                            <td>
                                <button disabled = {true}>
                                    Order online
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>      
        </>
    );
}

export default ReservationSummary;