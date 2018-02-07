import {handleActions} from "redux-actions";

const defaultRoomsState = [];

export const rooms = handleActions({
    GET_ROOMS_SUCCEEDED: (state, action) => [...action.payload]
}, defaultRoomsState);
