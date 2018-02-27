import {graphql} from 'react-apollo';
import gql from "graphql-tag";
import moment from "moment";

/*
    Queries
 */
const eventsByDateQuery = gql`
    query ($date: Date!) {
       eventsByDate(date: $date) {
            id, title, dateStart, dateEnd, room{id, title, floor}, users{id, login, avatarUrl}
       }
    }
`;

const getEventByIdQuery = gql`
    query event($id: ID!) {
        event(id: $id) {
            id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}
        }
    }
`;

const getUserListQuery = gql`
    query { 
        users {
            id, login, avatarUrl, homeFloor
        }
    }
`;

const getRoomListQuery = gql`
    query {
        rooms {
            id, title, capacity, floor
        }
    }
`;

export const getEventsByDate = graphql(
    eventsByDateQuery,
    {
        options: (props) => ({
            variables: {date: moment(props.date, "DD MMMM YYYY").set("hours", 12).startOf("hours").format()}
        }),
        props: ({data: {eventsByDate}}) => ({eventList: eventsByDate})
    }
);

export const getEventById = graphql(
    getEventByIdQuery,
    {
        options: ({match: {params}}) => ({variables: {id: params.id | null}}),
        props: ({data: {event}}) => ({event})
    }
);

export const getUserList = graphql(
    getUserListQuery,
    {
        props: ({data: {users}}) => ({userList: users})
    }
);

export const getRoomList = graphql(
    getRoomListQuery,
    {
        props: ({data: {rooms}}) => ({roomList: rooms})
    }
);


/*
    Mutations
 */
const createEventQuery = gql`
    mutation createEvent($input: EventInput!, $usersIds: [ID]!, $roomId: ID!) {
        createEvent(input: $input, usersIds: $usersIds, roomId: $roomId) {
            id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}
        }
    }
`;

const removeEventQuery = gql`
    mutation removeEvent($id: ID!) {
       removeEvent(id: $id) {
            id, dateStart
        }
    }
`;

const updateEventQuery = gql`
    mutation updateEvent($id: ID!, $input: EventInput!, $usersIds: [ID]!, $roomId: ID!) {
        updateEvent(id: $id, input: $input, usersIds: $usersIds, roomId: $roomId) {
            id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}
        }
    }
`;

export const createEvent = graphql(
    createEventQuery,
    {
        props: ({mutate}) => ({
            createEvent: ({usersIds, roomId, input}) => mutate({
                variables: {
                    usersIds,
                    roomId,
                    input
                }
            })
        }),
        options: {
            update: (proxy, {data: {createEvent}}) => {
                const date = moment(createEvent.dateStart).set("hours", 12).startOf("hours").format();
                const data = proxy.readQuery({
                    query: eventsByDateQuery,
                    variables: {date}
                });

                data.eventsByDate.push(createEvent);
                proxy.writeQuery({query: eventsByDateQuery, variables: {date}, data});
            }
        }
    }
);

export const removeEvent = graphql(
    removeEventQuery,
    {
        props: ({mutate}) => ({
            removeEvent: (id) => mutate({
                variables: {id}
            })
        }),
        options: {
            update: (proxy, {data: {removeEvent}}) => {
                const {id, dateStart} = removeEvent;
                const date = moment(dateStart).set("hours", 12).startOf("hours").format();
                const data = proxy.readQuery({
                    query: eventsByDateQuery,
                    variables: {date}
                });
                const events = data.eventsByDate;
                const index = events.findIndex(item => item.id === id);

                events.splice(index, 1);
                proxy.writeQuery({query: eventsByDateQuery, variables: {date}, data});
            }
        }
    }
);

// export const updateEvent =  graphql(
//     updateEventQuery,
//     {
//         props: ({mutate}) => ({
//             updateEvent: ({id, usersIds, roomId, input}) => mutate({
//                 variables: {
//                     id,
//                     usersIds,
//                     roomId,
//                     input
//                 }
//             })
//         }),
//         options: {
//             update: (proxy, {data: {updateEvent}}) => {
//                 const date = moment(updateEvent.dateStart).set("hours", 12).startOf("hours").format();
//                 const data = proxy.readQuery({
//                     query: updateEventQuery,
//                     variables: {date}
//                 });
// // если поменяем время???
//                 data.eventsByDate.push(createEvent);
//                 proxy.writeQuery({query: eventsByDateQuery, variables: {date}, data});
//             }
//         }
//     }
// );
