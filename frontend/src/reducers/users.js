import {handleActions} from "redux-actions";

const defaultUsersState = [];

export const users = handleActions({
    GET_USERS_SUCCEEDED: (state, action) => [...action.payload]
}, defaultUsersState);
