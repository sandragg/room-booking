import moment from "moment";
import {handleAction} from "redux-actions";

moment.locale("ru");

export const date = handleAction(
    "SET_DATE",
    (state, action) => action.payload,
    moment().format()
);
