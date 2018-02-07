import {combineReducers} from "redux";
import {event} from "./event";
import {users} from "./users";
import {rooms} from "./rooms";
import {date} from "./date";

export const rootReducer = combineReducers({
    event,
    users,
    rooms,
    date
});
