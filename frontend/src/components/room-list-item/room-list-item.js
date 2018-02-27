import React from "react";
import {
    RoomListItemStyled,
    RoomListItemTitleStyled,
    RoomListItemSubtitleStyled,
    RoomListItemWrapperStyled,
} from "./room-list-item-styled";
import RoomLineContainer from "../room-line";

export default ({disabled, title, subtitle, events, freeEvents, roomId}) => (
    <RoomListItemWrapperStyled>
        <RoomListItemStyled disabled={disabled}>
            <RoomListItemTitleStyled disabled={disabled}>{title}</RoomListItemTitleStyled>
            <RoomListItemSubtitleStyled disabled={disabled}>{subtitle}</RoomListItemSubtitleStyled>
        </RoomListItemStyled>
        <RoomLineContainer disabled={disabled} events={events} freeEvents={freeEvents} roomId={roomId}/>
    </RoomListItemWrapperStyled>

);
