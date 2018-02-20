import React from "react";
import {BookingDateText, BookingDateWrapperStyled} from "./booking-date-styled";
import BookingDateCalendar from "../booking-date-calendar";
import {Icon} from "../icon/icon";
import moment from "moment";

export default ({toggleCalendar, changeDate, day, isCalendarOpened}) => {
    const prev = moment(day,"DD MMMM YYYY").subtract(12, "hours"),
        next = moment(day,"DD MMMM YYYY").add(36, "hours");

    return (
        <BookingDateWrapperStyled>
            <Icon background type="arrowLeft" onClick={() => changeDate(prev)}/>
            <BookingDateText onClick={toggleCalendar}>{day}</BookingDateText>
            <Icon background type="arrowRight" onClick={() => changeDate(next)}/>
            {
                isCalendarOpened
                    ? <BookingDateCalendar
                        date={day}
                        changeDate={changeDate}
                        toggleCalendar={toggleCalendar}
                    />
                    : null
            }
        </BookingDateWrapperStyled>
    );
}
