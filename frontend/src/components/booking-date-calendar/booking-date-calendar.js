import React from "react";
import Modal from "../modal";
import {
    BookingDateCalendarWrapper
} from "./booking-date-calendar-styled";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';
import moment from "moment";

export default ({changeDate, toggleCalendar, date}) => {
    const onDateChange = (date) => {
        changeDate(date);
        toggleCalendar();
    };

    return (
        <Modal>
            <BookingDateCalendarWrapper>
                <DayPickerSingleDateController
                    numberOfMonths={1}
                    date={moment(date,"DD MMMM YYYY")}
                    onDateChange={onDateChange}
                    focused={true}
                />
            </BookingDateCalendarWrapper>
        </Modal>
    );
}

