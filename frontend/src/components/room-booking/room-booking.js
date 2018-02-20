import React from "react";
import moment from "moment";

import {Column} from "../common-style";
import {
    RoomBookingDiagramWrapperStyled,
    RoomBookingTimeLineWrapperStyled,
    RoomBookingDiagramContentStyled
} from "./room-booking-styled";
import BookingDate from "../booking-date";
import TimeLine from "../time-line";
import RoomList from "../room-list";
import {ONE_MINUTE_WIDTH, ONE_HOUR_WIDTH, startHour, endHour} from "../constants";

export class RoomBooking extends React.Component {
    constructor(props) {
        super(props);

        moment.locale("ru");

        this.hoursLength = endHour - startHour + 1;
        this.eightHours = 60 * 8;
        this.hours = Array.apply(null, {length: this.hoursLength}).map((e, i) => i + startHour);

        this.state = {
            rooms: {},
            events: [],
            isCalendarOpened: false,
            time: moment().format("LT")
        };

        this.mapEventsToState = this.mapEventsToState.bind(this);
        this.mapRoomsToState = this.mapRoomsToState.bind(this);
        this.calculateTickerOffset = this.calculateTickerOffset.bind(this);
        this.tick = this.tick.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);

        this.interval = setInterval(this.tick, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rooms: nextProps.rooms ? this.mapRoomsToState(nextProps.rooms) : {},
            events: nextProps.events ? this.mapEventsToState(nextProps.events) : []
        });
    }

    mapEventsToState(events) {
        return events.map(event => {
            const start = moment(event.dateStart);
            const end = moment(event.dateEnd);
            const duration = moment.duration(end.diff(start)).asMinutes();
            const offset = start.hours() * 60 + start.minutes();

            return {
                ...event,
                width: Math.abs(duration * ONE_MINUTE_WIDTH),
                offset: Math.abs((offset - this.eightHours) * ONE_MINUTE_WIDTH)
            };
        });
    }

    mapRoomsToState(rooms) {
        return rooms.reduce((roomList, room) => {
            if (roomList[room.floor]) {
                roomList[room.floor].push(room);
            }
            else {
                roomList[room.floor] = [room];
            }

            return roomList;
        }, {});
    }

    calculateTickerOffset() {
        const hours = this.state.time.split(":")[0] - 8;
        const minutes = this.state.time.split(":")[1];
        const hoursWidth = hours * ONE_HOUR_WIDTH;
        const minutesWidth = minutes * ONE_MINUTE_WIDTH;

        return hoursWidth + minutesWidth;
    }

    tick() {
        this.setState({time: moment().format("LT")});
    }

    toggleCalendar() {
        this.setState({isCalendarOpened: !this.state.isCalendarOpened});
    }

    render() {
        const {time, rooms, events, isCalendarOpened} = this.state;
        const offset = this.calculateTickerOffset();

        return (
            <Column>
                <RoomBookingTimeLineWrapperStyled>
                    <BookingDate
                        day={this.props.date}
                        changeDate={this.props.onDateChange}
                        toggleCalendar={this.toggleCalendar}
                        isCalendarOpened={isCalendarOpened}
                    />
                    <TimeLine
                        hours={this.hours}
                        tickerTime={time}
                        tickerOffset={offset}
                    />
                </RoomBookingTimeLineWrapperStyled>
                <RoomBookingDiagramWrapperStyled>
                    <RoomBookingDiagramContentStyled>
                        <RoomList
                            rooms={rooms}
                            events={events}
                        />
                    </RoomBookingDiagramContentStyled>
                </RoomBookingDiagramWrapperStyled>
            </Column>
        );
    }
}
