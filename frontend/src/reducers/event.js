import {handleActions} from "redux-actions";
import moment from "moment";

const defaultEventState = {
    id: null,
    title: "",
    membersIds: [],
    date: "",
    startTime: "",
    endTime: "",
    roomId: null
};

export const event = handleActions({
    // Инициализирует store.event при переходе на форму редактирования.
    EDIT_EVENT: (state, action) => (
        {...defaultEventState, ...action.payload}
    ),
    // Обновляет store.event при каждом input onChange.
    EDIT_EVENT_PROP: (state, action) => (
        {...state, [action.meta]: action.payload}
    ),
    GET_EVENT_BY_ID_SUCCEEDED: (state, action) => {
        const event = action.payload;
        console.log(event);
        // console.log(event.users.map(user => user.id));
        return {
            id: event.id,
            title: event.title,
            membersIds: event.users ? event.users.map(user => user.id) : [],
            date: moment(event.dateStart).format("DD MM YYYY"),
            startTime: moment(event.dateStart).format("LT"),
            endTime: moment(event.dateEnd).format("LT"),
            roomId: event.RoomId
        }
    }
}, defaultEventState);