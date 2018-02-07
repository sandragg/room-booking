import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreators from "../../actions";
import moment from "moment";

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

    componentDidMount() {
        this.props.getUsers()
            .then(() => this.setState({users: this.props.users}));
        this.props.getRooms()
            .then(() => this.setState({rooms: this.props.rooms}));
    }

    render() {
        return (
            <Column>
                <Header>
                    <Link to="create">
                        <Button primary onClick={() => this.props.onCreateButtonClick()}>Создать встречу</Button>
                    </Link>
                </Header>
                <RoomBooking
                    users={this.state.users}
                    rooms={this.state.rooms}
                    date={this.props.date}
                    onDateChange={this.props.onDateChange}
                    //onCreateButtonClick={this.props.onCreateButtonClick}
                />
            </Column>
        )
    }
}

const mapStateToProps = (store) => ({
    users: store.users,
    rooms: store.rooms,
    date: store.date
});

const mapDispatchToProps = (dispatch) => ({
    onCreateButtonClick: (props) => dispatch(actionCreators.editEvent(props)),
    getUsers: () => dispatch(actionCreators.getUsers()),
    getRooms: () => dispatch(actionCreators.getRooms()),
    onDateChange: (date) => dispatch(actionCreators.setDate(date))
});

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
