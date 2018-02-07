import React from "react";
import {NewEventWrapper} from "./new-event-styled";

export default ({offset, id, onClick}) => {
    return (
        <NewEventWrapper id={id} offset={offset} onClick={onClick}>+</NewEventWrapper>
    );
}