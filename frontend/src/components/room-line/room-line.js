import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import {Link} from "react-router-dom";

import {RoomLineWrapperStyled, RoomLineContentStyled} from "./room-line-styled";
import {ONE_MINUTE_WIDTH, START_HOUR} from "../constants";
import Event from "../event";
import NewEvent from "../new-event";

class RoomLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            newEventOffset: null,
            roomLineLeftOffset: null,
            roomLineRightOffset: null,
            roomLineWidth: null,
            available: false,
            newEventDuration: null
        };

        this.createNewEvent = this.createNewEvent.bind(this);
        this.showNewEvent = this.showNewEvent.bind(this);
        this.hideNewEvent = this.hideNewEvent.bind(this);
        this.calcNewEventOffset = this.calcNewEventOffset.bind(this);
        this.calcNewEventDuration = this.calcNewEventDuration.bind(this);
    };

    showNewEvent(e) {
        if (!this.state.hover
            && (e.target.id === "room-line"
                || e.target.id === "new-event")
        ) {
            const bounds = e.target.getBoundingClientRect();

            this.setState({
                hover: true,
                roomLineLeftOffset: bounds.left,
                roomLineRightOffset: bounds.right,
                roomLineWidth: bounds.width
            });
        }
    }

    hideNewEvent(e) {
        if (this.state.hover
            && e.relatedTarget
            && e.relatedTarget.id !== "room-line"
            && e.relatedTarget.id !== "new-event"
        ) {
            this.setState({hover: false, roomLineLeftOffset: null, available: false});
        }
    }

    calcNewEventDuration(eventOffset) {
        const {date} = this.props;
        const minuteOffset = this.state.roomLineWidth * ONE_MINUTE_WIDTH / 100;
        let eventMinutes = eventOffset / minuteOffset - 15,
            eventHours;

        eventHours = parseInt(eventMinutes / 60 + START_HOUR);
        eventMinutes = parseInt(eventMinutes % 60);

        if (eventMinutes < 0) eventHours = START_HOUR;

        const start = moment(date, "DD MMMM YYYY").set({hour: eventHours, minute: eventMinutes});
        const end = moment(start).add(30, "minutes");

        return {
            dateStart: start.format(),
            dateEnd: end.format()
        }
    }

    checkFreeEventsBounds(newEvent) {
        const {freeEvents} = this.props;
        const end = moment(newEvent.dateEnd), start = moment(newEvent.dateStart);

        return freeEvents.some(event => (
            !end.isAfter(event[1]) && start.isSameOrAfter(event[0])
        ));
    }

    calcNewEventOffset(e) {
        if (!this.state.hover) return;

        const newEventOffset = e.pageX - this.state.roomLineLeftOffset;
        const newEventDuration = this.calcNewEventDuration(newEventOffset);

        this.setState({
            newEventOffset,
            newEventDuration,
            available: this.checkFreeEventsBounds(newEventDuration)
        });
    }

    createNewEvent() {
        const {dateStart, dateEnd} = this.state.newEventDuration;
        const start = moment(dateStart);

        return {
            roomId: this.props.roomId,
            date: start.format("YYYY-MM-DD"),
            startTime: start.format("HH:mm"),
            endTime: moment(dateEnd).format("HH:mm")
        };
    }

    render() {
        const {available, newEventOffset} = this.state;
        const {events, disabled} = this.props;

        return (
            <RoomLineWrapperStyled>
                <RoomLineContentStyled
                    id="room-line"
                    onMouseMove={!disabled && this.calcNewEventOffset}
                    onMouseOver={!disabled && this.showNewEvent}
                    onMouseOut={!disabled && this.hideNewEvent}
                >
                    {
                        events.map(event =>
                            <Event id="event"
                                   key={"event" + event.dateStart}
                                   event={event}
                            />
                        )
                    }
                    {
                        available
                            ? <Link to={{
                                pathname: "create",
                                state: {
                                    event: this.createNewEvent()
                                }
                            }}>
                                <NewEvent id="new-event" offset={newEventOffset}/>
                            </Link>
                            : null
                    }
                </RoomLineContentStyled>
            </RoomLineWrapperStyled>
        );
    }
}

const mapStateToProps = (store) => ({
    date: store.date
});

const RoomLineContainer = connect(
    mapStateToProps
)(RoomLine);

export default RoomLineContainer;