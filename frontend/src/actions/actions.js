import {createActions} from "redux-actions";
import {graphql} from 'react-apollo';
import gql from "graphql-tag";

const actionCreators = createActions({
    SET_DATE: (date) => date
});

export const {setDate} = actionCreators;


/*
    Get certain object
 */
export const getEventById =  graphql(
    gql`query event($id: ID!) {event(id: $id) {id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}}}`,
    {
        options: ({match: {params}}) => ({variables: {id: params.id | null}}),
        props: ({data: {event}}) => ({event})
    }
);


/*
    Get object list
 */
export const getUserList = graphql(
    gql`query {users {id, login, avatarUrl, homeFloor}}`,
    {
        props: ({data: {users}}) => ({userList: users})
    }
);

export const getRoomList = graphql(
    gql`query {rooms {id, title, capacity, floor}}`,
    {
        props: ({data: {rooms}}) => ({roomList: rooms})
    }
);

export const getEventList = graphql(
    gql`query {events {id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}}}`,
    {
        props: ({data: {events}}) => ({eventList: events})
    }
);
