import {createActions} from "redux-actions";
import {graphql} from 'react-apollo';
import gql from "graphql-tag";
import moment from "moment";

const actionCreators = createActions({
    SET_DATE: (date) => date
});

export const {setDate} = actionCreators;

/*
    Create a new object
 */
export const createEvent = graphql(
    gql`mutation createEvent($input: EventInput!, $usersIds: [ID], $roomId: ID!) {
        createEvent(input: $input, usersIds: $usersIds, roomId: $roomId) {
            title, dateStart, room{id}
        }
    }`,
    {
        props: ({mutate}) => ({
            createEvent: (event) => mutate({
                variables: {
                    usersIds: event.membersIds,
                    roomId: event.roomId,
                    input: {...event} // ?????
                }
            })
        })
    }
);

/*
    Update an object
 */
// export const updateEvent =  graphql(
//     gql`mutation updateEvent($input: EventInput!, $usersIds: [ID], $roomId: ID!) {
//         updateEvent(input: $input, usersIds: $usersIds, roomId: $roomId) {
//             title, dateStart, room{id}
//         }
//     }`,
//     {
//         props: ({mutate}) => ({
//             updateEvent: (event) => mutate({
//                 variables: {
//                     usersIds: event.membersIds,
//                     roomId: event.roomId,
//                     input: {...event} // ?????
//                 }
//             })
//         })
//     }
// );


/*
    Delete an object
 */
export const removeEvent = graphql(
    gql`mutation removeEvent($id: ID!) {
       removeEvent(id: $id) {
            title, dateStart, room{id}
        }
    }`,
    {
        props: ({mutate}) => ({
            removeEvent: (id) => mutate({
                variables: {id}
            })
        }),
        options: {
            refetchQueries: ({data: {removeEvent}}) => {
                console.log(moment(removeEvent.dateStart));
                return [{
                    query: gql`
                      query ($date: Date!) {
                        eventsByDate(date: $date) {
                            id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}
                        }
                    }
                    `,
                    variables: {
                        date: moment(removeEvent.dateStart).set({
                            'hour': 12,
                            'minute': 0,
                            'second': 0,
                            'millisecond': 0
                        }).format()
                    }
                }]
            },
        },
    }
);


/*
    Get one object
 */
export const getEventById = graphql(
    gql`query event($id: ID!) {
        event(id: $id) {
            id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}
        }
    }`,
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

export const getEventsByDate = graphql(
    gql`query ($date: Date!) {
        eventsByDate(date: $date) {
            id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}
        }
    }`,
    {
        options: (props) => ({
            variables: {date: moment(props.date, "DD MMMM YYYY").add(12, "hours").format()}
        }),
        props: ({data: {eventsByDate}}) => ({eventList: eventsByDate})
    }
);
