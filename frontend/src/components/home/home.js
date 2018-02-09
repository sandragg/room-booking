import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";
import {compose} from 'react-apollo';

import * as actionCreators from "../../actions";
import {Column} from "../common-style";
import {Button} from "../button";
import {Header} from "../header";
import {RoomBooking} from "../room-booking/room-booking";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            rooms: []
        }
    }

    render() {
        console.log("homepage roomList>>>", this.props, this.state);
        return (
            <Column>
                <Header>
                    <Link to="create">
                        <Button primary onClick={() => this.props.onCreateButtonClick()}>Создать встречу</Button>
                    </Link>
                </Header>
                <RoomBooking
                    rooms={this.props.roomList}
                    events={this.props.eventList}
                    date={this.props.date}
                    onDateChange={this.props.onDateChange}
                />
            </Column>
        )
    }
}

const HomePageWithData = compose(
    actionCreators.getRoomList,
    actionCreators.getEventList
)(HomePage);

const mapStateToProps = (store) => ({
    date: store.date
});

const mapDispatchToProps = (dispatch) => ({
    onCreateButtonClick: (props) => dispatch(actionCreators.editEvent(props)),
    onDateChange: (date) => dispatch(actionCreators.setDate(date))
});

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageWithData);
