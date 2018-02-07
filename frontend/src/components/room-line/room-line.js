import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import {Link} from "react-router-dom";
import * as actionCreators from "../../actions";

import {RoomLineWrapperStyled, RoomLineContentStyled} from "./room-line-styled";
import {ONE_HOUR_WIDTH, ONE_MINUTE_WIDTH, startHour} from "../constants";
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
        this.getDecimal = this.getDecimal.bind(this);
    };

    showNewEvent(e) {
        if (!this.state.hover
            && (e.target.id === "room-line"
                || e.target.id === "new-event")
        ) {
            const bounds = e.target.getBoundingClientRect();
            console.log(bounds);
            this.setState({
                hover: true,
                roomLineLeftOffset: bounds.left,
                roomLineRightOffset: bounds.right,
                roomLineWidth: bounds.width
            });
        }
    }

    hideNewEvent(e) {
        console.log("Tar", e.target);
        console.log("relTar", e.relatedTarget);
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

    getDecimal(num) {
        return num > 0 ? (num % 1) : (-num % 1);
    }

    createNewEvent() {
        const minuteOffset = this.state.roomLineWidth * ONE_MINUTE_WIDTH / 100;
        let eventMinutes = this.state.newEventOffset / minuteOffset - 15,
            eventHours, start, end, eventProps = {};

        if (eventMinutes < 0) eventMinutes = 0;
        eventHours = parseInt(eventMinutes / 60 + startHour);
        eventMinutes = parseInt(eventMinutes % 60);

        console.log(eventHours);
        console.log(eventMinutes);

        start = moment(this.props.date).set({hour: eventHours, minute: eventMinutes});
        end = moment(start).add(30, "minutes");

        eventProps = {
            roomId: this.props.roomId,
            date: start.format("DD MM YYYY"),
            startTime: start.format("LT"),
            endTime: end.format("LT")
        };

        this.props.onCreateButtonClick(eventProps);
    }

    render() {
        const {events} = this.props;

        return (
            <RoomLineWrapperStyled>
                <RoomLineContentStyled
                    id="room-line"
                    onMouseMove={this.calcNewEventOffset}
                    onMouseOver={this.showNewEvent}
                    onMouseOut={this.hideNewEvent}
                >
                    {events.map(event =>
                        <Event id="event"
                               key={"event" + event.dateStart}
                               event={event}
                               onTooltipIconClick={() => this.props.onEditButtonClick(event.id)}
                        />
                    )}
                    {this.state.hover
                        ? <Link to="create">
                            <NewEvent id="new-event"
                                      offset={this.state.newEventOffset}
                                      onClick={this.createNewEvent}
                            />
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

const mapDispatchToProps = (dispatch) => ({
    onCreateButtonClick: (props) => dispatch(actionCreators.editEvent(props)),
    onEditButtonClick: (id) => dispatch(actionCreators.getEventById(id))
});

const RoomLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomLine);

export default RoomLineContainer;