import React from "react";
import {Row, Column} from "../common-style";
import {
    RoomBookingDiagramWrapperStyled,
    RoomBookingTimeLineWrapperStyled,
    RoomBookingDiagramContentStyled
} from "./room-booking-styled";
import BookingDate from "../booking-date";
import TimeLine from "../time-line";
import RoomList from "../room-list";
import "moment/min/locales.min";
import moment from "moment";
import {ONE_MINUTE_WIDTH, ONE_HOUR_WIDTH, startHour, endHour} from "../constants";

export class RoomBooking extends React.Component {
    constructor(props) {
        super(props);

        moment.locale("ru");

        const hoursLength = endHour - startHour + 1;

        this.hours = Array.apply(null, {length: hoursLength}).map((e, i) => i + startHour);

        this.events = [
            {
                "id": 1,
                "title": "ШРИ 2018 - начало",
                "dateStart": "2017-12-29 14:21:04.669 +00:00",
                "dateEnd": "2017-12-29 15:48:04.669 +00:00",
                "createdAt": "2017-12-29 14:21:04.669 +00:00",
                "updatedAt": "2017-12-29 14:21:04.713 +00:00",
                "room": {
                    "id": 1,
                    "title": "404",
                    "capacity": 5,
                    "floor": 4,
                    "createdAt": "2017-12-29 14:21:04.668 +00:00",
                    "updatedAt": "2017-12-29 14:21:04.668 +00:00"
                },
                "users": [
                    {
                        "id": 1,
                        "login": "veged",
                        "homeFloor": "0 этаж",
                        "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    },
                    {
                        "id": 2,
                        "login": "alt-j",
                        "homeFloor": "3 этаж",
                        "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    },
                ]
            },
            {
                "id": 2,
                "title": "\uD83D\uDC7E Хакатон \uD83D\uDC7E",
                "dateStart": "2017-12-29 15:21:04.669 +00:00",
                "dateEnd": "2017-12-29 16:21:04.669 +00:00",
                "createdAt": "2017-12-29 14:21:04.669 +00:00",
                "updatedAt": "2017-12-29 14:21:04.715 +00:00",
                "room": {
                    "id": 2,
                    "title": "Деньги",
                    "capacity": 4,
                    "floor": 2,
                    "createdAt": "2017-12-29 14:21:04.668 +00:00",
                    "updatedAt": "2017-12-29 14:21:04.668 +00:00"
                },
                "users": [
                    {
                        "id": 2,
                        "login": "alt-j",
                        "homeFloor": "3 этаж",
                        "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    },
                    {
                        "id": 3,
                        "login": "yeti-or",
                        "homeFloor": "2 этаж",
                        "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    }
                ]
            },
            {
                "id": 3,
                "title": "\uD83C\uDF68 Пробуем kefir.js",
                "dateStart": "2017-12-29 16:21:04.669 +00:00",
                "dateEnd": "2017-12-29 17:21:04.669 +00:00",
                "createdAt": "2017-12-29 14:21:04.669 +00:00",
                "updatedAt": "2017-12-29 14:21:04.716 +00:00",
                "room": {
                    "id": 3,
                    "title": "Карты",
                    "capacity": 4,
                    "floor": 2,
                    "createdAt": "2017-12-29 14:21:04.668 +00:00",
                    "updatedAt": "2017-12-29 14:21:04.668 +00:00"
                },
                "users": [
                    {
                        "id": 1,
                        "login": "veged",
                        "homeFloor": "0 этаж",
                        "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    },
                    {
                        "id": 3,
                        "login": "yeti-or",
                        "homeFloor": "2 этаж",
                        "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4",
                        "createdAt": "2017-12-29 14:21:04.666 +00:00",
                        "updatedAt": "2017-12-29 14:21:04.666 +00:00"
                    }
                ]
            }
        ];

        this.state = {
            rooms: {},
            users: []
        };

        this.state.events = this.events.map(event => {
            const eightHours = 480;
            const start = moment(event.dateStart);
            const end = moment(event.dateEnd);
            const duration = moment.duration(end.diff(start)).asMinutes();
            const offset = start.hours() * 60 + start.minutes();

            event.width = Math.abs(duration * ONE_MINUTE_WIDTH);
            event.offset = Math.abs((offset - eightHours) * ONE_MINUTE_WIDTH);

            return event;
        });

        this.state.isCalendarOpened = false;
        this.state.day = moment(this.props.date).format("DD MMMM YYYY");
        this.state.time = moment().format("LT");

        this.calculateTickerOffset = this.calculateTickerOffset.bind(this);
        this.tick = this.tick.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);

        this.interval = setInterval(this.tick, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rooms:
                nextProps.rooms.reduce((acc, item) => {
                    if (acc[item.floor]) {
                        acc[item.floor].push(item);
                    }
                    else {
                        acc[item.floor] = [item];
                    }

                    return acc;
                }, {}),
            users: [...nextProps.users],
            day: moment(nextProps.date).format("DD MMMM YYYY")
        });
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
        const {day, time, rooms, events, isCalendarOpened} = this.state;
        const offset = this.calculateTickerOffset();
        console.log(">>>",time);
        console.log(day);
        return (
            <Column>
                <RoomBookingTimeLineWrapperStyled>
                    <BookingDate
                        day={day}
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
