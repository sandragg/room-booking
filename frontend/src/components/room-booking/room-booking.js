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
import {ONE_MINUTE_WIDTH, ONE_HOUR_WIDTH, START_HOUR, END_HOUR} from "../constants";

export class RoomBooking extends React.Component {
    constructor(props) {
        super(props);

        this.hoursLength = END_HOUR - START_HOUR + 1;
        this.eightHours = 60 * 8;
        this.hours = Array.apply(null, {length: this.hoursLength}).map((e, i) => i + START_HOUR);

        this.state = {
            rooms: null,
            eventsByRoom: null,
            freeEventsByRoom: null,
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
        // TODO заменить все пустые {},[] на null и добавить проверки ?!
        if (nextProps.rooms && nextProps.events)
            this.setState({
                rooms: this.mapRoomsToState(nextProps.rooms),
                eventsByRoom: this.mapEventsToState(nextProps.events),
                freeEventsByRoom: null
            })
    }

    componentDidUpdate() {
        if (this.state.eventsByRoom && !this.state.freeEventsByRoom)
            this.setState({
                freeEventsByRoom: this.mapFreeEventsToState(this.state.eventsByRoom)
            });
    }

    mapFreeEventsToState(eventsByRoom) {
        const {date, rooms} = this.props,
            startOfDay = moment(date, "DD MMMM YYYY").set("hours", START_HOUR).format(),
            endOfDay = moment(date, "DD MMMM YYYY").set("hours", END_HOUR).format();
        let freeStartTime;

        return rooms
            .map(room => room.id)
            .reduce((freeEventsByRoom, roomId) => {
                if (!eventsByRoom[roomId]) {
                    freeEventsByRoom[roomId] = [[startOfDay, endOfDay]];
                    return freeEventsByRoom;
                }

                freeStartTime = startOfDay;

                freeEventsByRoom[roomId] = eventsByRoom[roomId].reduce((freeEventList, event) => {
                    if (moment(event.dateStart).diff(freeStartTime, "minutes") >= 30) {
                        freeEventList.push([freeStartTime, event.dateStart]);
                    }
                    freeStartTime = event.dateEnd;

                    return freeEventList;
                }, []);

                if (moment(endOfDay).diff(freeStartTime, "minutes") >= 30)
                    freeEventsByRoom[roomId].push([freeStartTime, endOfDay]);

                return freeEventsByRoom;
            }, {});
    }

    mapEventsToState(events) {
        let start, end, duration, offset, newEvent, roomId;

        return [...events]
            .sort((first, second) =>
                moment(first.dateStart).isAfter(second.dateStart) ? 1 : -1
            )
            .reduce((eventList, event) => {
                start = moment(event.dateStart);
                end = moment(event.dateEnd);
                duration = moment.duration(end.diff(start)).asMinutes();
                offset = start.hours() * 60 + start.minutes();
                roomId = event.room.id;
                newEvent = {
                    ...event,
                    width: Math.abs(duration * ONE_MINUTE_WIDTH),
                    offset: Math.abs((offset - this.eightHours) * ONE_MINUTE_WIDTH)
                };

                if (eventList[roomId]) {
                    eventList[roomId].push(newEvent);
                }
                else {
                    eventList[roomId] = [newEvent];
                }

                return eventList;
            }, {});
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
        const {time, rooms, eventsByRoom, freeEventsByRoom, isCalendarOpened} = this.state;
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
                            eventsByRoom={eventsByRoom}
                            freeEventsByRoom={freeEventsByRoom}
                        />
                    </RoomBookingDiagramContentStyled>
                </RoomBookingDiagramWrapperStyled>
            </Column>
        );
    }
}
