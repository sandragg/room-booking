import {createActionThunk} from "redux-thunk-actions";
import camelCase from "redux-actions/es/camelCase";

const createActionsThunk = (map) => {
    const types = Object.keys(map);
    const actionsThunk = {};

    types.forEach(type => {
        actionsThunk[camelCase(type)] = createActionThunk(type, map[type])
    });

    return actionsThunk;
};

export {createActionsThunk};
