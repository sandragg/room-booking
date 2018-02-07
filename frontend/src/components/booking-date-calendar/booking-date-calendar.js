import React from "react";
import Modal from "../modal";
import {
    BookingDateCalendarWrapper
} from "./booking-date-calendar-styled";
import { DayPickerSingleDateController } from 'react-dates';

export default ({changeDate, toggleCalendar}) => {
    const onDateChange = (date) => {
        changeDate(date);
        toggleCalendar();
    };

    return (
        <Modal>
            <BookingDateCalendarWrapper>
                <DayPickerSingleDateController
                    numberOfMonths={2}
                    onDateChange={onDateChange}
                />
            </BookingDateCalendarWrapper>
        </Modal>
    );
}

