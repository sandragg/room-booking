import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'react-apollo';

import {setDate} from "../../redux-actions";
import {
    getRoomList,
    getEventsByDate
} from "../../apollo-actions";
import {Column} from "../common-style";
import {Button} from "../button";
import {Header} from "../header";
import {RoomBooking} from "../room-booking/room-booking";

const HomePage = ({roomList, eventList, date, onDateChange}) => (
    <Column>
        <Header>
            <Link to="create">
                <Button primary>Создать встречу</Button>
            </Link>
        </Header>
        <RoomBooking
            rooms={roomList}
            events={eventList}
            date={date}
            onDateChange={onDateChange}
        />
    </Column>
);

const HomePageWithData = compose(
    getRoomList,
    getEventsByDate
)(HomePage);

const mapStateToProps = (store) => ({
    date: store.date
});

const mapDispatchToProps = (dispatch) => ({
    onDateChange: (date) => dispatch(setDate(date))
});

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageWithData);
