import {createActions} from "redux-actions";
import {createActionsThunk} from "../redux-thunk-actions/redux-thunk-actions";
import "whatwg-fetch";
import {graphql} from 'react-apollo';
import gql from "graphql-tag";

const actionCreators = createActions({
    EDIT_EVENT: (value) => value,
    // firstArg - новое значение св-ва; secondArg - ключ св-ва.
    EDIT_EVENT_PROP: [
        (value) => value,
        (value, flag) => flag
    ],
    SET_DATE: (date) => date
});

export const {editEvent, editEventProp, setDate} = actionCreators;

const getList = (path) => fetch(path).then(res => res.json());
const getById = (path, id) => (
    fetch(path)
        .then(res => res.json())
        .then(json => json.find(item => item.id === id))
);

const actionThunkCreators = createActionsThunk({
    GET_USERS: () => getList("users.json"),
    GET_ROOMS: () => getList("rooms.json"),
    GET_EVENTS: () => getList("events.json"),
    GET_EVENT_BY_ID: (id) => getById("events.json", id)
});

export const {getUsers, getRooms, getEvents, getEventById} = actionThunkCreators;

export const getUserList = graphql(
    gql`query {users {id, login, avatarUrl, homeFloor}}`,
    {
        props: ({data: {users}}) => ({userList: users})
    }
);

export const getRoomList = graphql(
    gql`query {rooms {id, title, capacity, floor}}`,
    {
        name: "room",
        props: ({room: {rooms}}) => ({roomList: rooms})
    }
);

export const getEventList = graphql(
    gql`query {events {id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl, homeFloor}}}`,
    {
        name: "event",
        props: ({event: {events}}) => ({eventList: events})
    }
);
