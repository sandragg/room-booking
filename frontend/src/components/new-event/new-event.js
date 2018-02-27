import React from "react";
import {NewEventWrapper} from "./new-event-styled";

export default ({offset, id}) => {
    return (
        <NewEventWrapper id={id} offset={offset}>+</NewEventWrapper>
    );
}