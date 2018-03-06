import moment from "moment";
import {START_HOUR, END_HOUR} from "../components/constants";

export const sortEventsByDate = events => (
    [...events].sort((first, second) =>
        moment(first.dateStart).isAfter(second.dateStart) ? 1 : -1
    )
);

export const groupEventsByRoom = events => {
    let roomId;

    return events.reduce((eventList, event) => {
        roomId = event.room.id;

        if (eventList[roomId]) {
            eventList[roomId].push(event);
        }
        else {
            eventList[roomId] = [event];
        }

        return eventList;
    }, {});
};

export const groupFreeEventsByRoom = (eventsByRoom, roomList, date) => {
    const startOfDay = moment(date, "DD MMMM YYYY").set("hours", START_HOUR).format(),
        endOfDay = moment(date, "DD MMMM YYYY").set("hours", END_HOUR).format();
    let freeStartTime;

    return roomList
        .map(room => room.id)
        .reduce((freeEventsByRoom, roomId) => {
            if (!eventsByRoom[roomId]) {
                freeEventsByRoom[roomId] = [[startOfDay, endOfDay]];
                return freeEventsByRoom;
            }

            freeStartTime = startOfDay;

            freeEventsByRoom[roomId] = eventsByRoom[roomId].reduce((freeEventList, event) => {
                if (moment(event.dateStart).diff(freeStartTime, "minutes") >= 30) {
                    freeEventList.push([freeStartTime, event.dateStart]);
                }
                freeStartTime = event.dateEnd;

                return freeEventList;
            }, []);

            if (moment(endOfDay).diff(freeStartTime, "minutes") >= 30)
                freeEventsByRoom[roomId].push([freeStartTime, endOfDay]);

            return freeEventsByRoom;
        }, {});
};
