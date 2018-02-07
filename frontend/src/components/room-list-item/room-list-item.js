import React from "react";
import {
    RoomListItemStyled,
    RoomListItemTitleStyled,
    RoomListItemSubtitleStyled,
    RoomListItemWrapperStyled,
} from "./room-list-item-styled";
import RoomLineContainer from "../room-line";

export default ({disabled, title, subtitle, events, roomId}) => (
    <RoomListItemWrapperStyled>
        <RoomListItemStyled disabled={disabled}>
            <RoomListItemTitleStyled disabled={disabled}>{title}</RoomListItemTitleStyled>
            <RoomListItemSubtitleStyled disabled={disabled}>{subtitle}</RoomListItemSubtitleStyled>
        </RoomListItemStyled>
        <RoomLineContainer events={events} roomId={roomId}/>
    </RoomListItemWrapperStyled>

);
