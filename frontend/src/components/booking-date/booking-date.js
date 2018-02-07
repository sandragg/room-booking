import React from "react";
import {BookingDateText, BookingDateWrapperStyled} from "./booking-date-styled";
// import BookingDateCalendar from "../booking-date-calendar";

export default ({toggleCalendar, changeDate, day, isCalendarOpened}) => {
    return (
        <BookingDateWrapperStyled>
            <BookingDateText onClick={toggleCalendar}>{day}</BookingDateText>
            {/*{*/}
                {/*isCalendarOpened*/}
                    {/*? <BookingDateCalendar*/}
                        {/*changeDate={changeDate}*/}
                        {/*toggleCalendar={toggleCalendar}*/}
                    {/*/>*/}
                    {/*: null*/}
            {/*}*/}
        </BookingDateWrapperStyled>
    );
}
