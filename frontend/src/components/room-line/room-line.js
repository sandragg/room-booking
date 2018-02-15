import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import {Link} from "react-router-dom";

import {RoomLineWrapperStyled, RoomLineContentStyled} from "./room-line-styled";
import {ONE_MINUTE_WIDTH, startHour} from "../constants";
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
            roomLineWidth: null
        };

        this.createNewEvent = this.createNewEvent.bind(this);
        this.showNewEvent = this.showNewEvent.bind(this);
        this.hideNewEvent = this.hideNewEvent.bind(this);
        this.calcNewEventOffset = this.calcNewEventOffset.bind(this);
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
            this.setState({hover: false, roomLineLeftOffset: null});
        }
    }

    calcNewEventOffset(e) {
        if (this.state.hover && e.target.id !== "event") {
            e.pageX < this.state.roomLineLeftOffset || e.pageX > this.state.roomLineRightOffset
                ? this.setState({hover: false, roomLineLeftOffset: null})
                : this.setState({newEventOffset: e.pageX - this.state.roomLineLeftOffset});
        }
    }

    createNewEvent() {
        const minuteOffset = this.state.roomLineWidth * ONE_MINUTE_WIDTH / 100;
        let eventMinutes = this.state.newEventOffset / minuteOffset - 15, eventHours;

        if (eventMinutes < 0) {
            eventMinutes = 0;
            eventHours = startHour;
        } else {
            eventHours = parseInt(eventMinutes / 60 + startHour);
            eventMinutes = parseInt(eventMinutes % 60);
        }

        const start = moment(this.props.date).set({hour: eventHours, minute: eventMinutes});
        const end = moment(start).add(30, "minutes");

        return {
            roomId: this.props.roomId,
            date: start.format("DD MM YYYY"),
            startTime: start.format("LT"),
            endTime: end.format("LT")
        };
    }

    render() {
        return (
            <RoomLineWrapperStyled>
                <RoomLineContentStyled
                    id="room-line"
                    onMouseMove={this.calcNewEventOffset}
                    onMouseOver={this.showNewEvent}
                    onMouseOut={this.hideNewEvent}
                >
                    {this.props.events.map(event =>
                        <Event id="event"
                           key={"event" + event.dateStart}
                           event={event}
                        />
                    )}
                    {this.state.hover
                        ? <Link to={{
                                pathname: "create",
                                state: {
                                    event: this.createNewEvent()
                                }
                            }}>
                                <NewEvent id="new-event" offset={this.state.newEventOffset}/>
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