import React from "react";
import RoomListItem from "../room-list-item";
import {
    RoomListStyled,
    RoomListWrapperStyled,
    RoomListFloorStyled,
    RoomListFloorWrapperStyled
} from "./room-list-styled";

const empty = [];

export default ({rooms, freeEventsByRoom, eventsByRoom}) => (
    <RoomListWrapperStyled>
        <RoomListStyled>
            {
                rooms
                    ? Object.keys(rooms).reverse().map(floor => (
                    <RoomListFloorWrapperStyled key={floor + "floor"}>
                        <RoomListFloorStyled>{floor} ЭТАЖ</RoomListFloorStyled>
                        {
                            rooms[floor].map(room => (
                                <RoomListItem
                                    key={room.title + "room"}
                                    roomId={room.id}
                                    title={room.title}
                                    subtitle={`до ${room.capacity} человек`}
                                    events={
                                        eventsByRoom[room.id]
                                            ? eventsByRoom[room.id]
                                            : empty
                                    }
                                    freeEvents={
                                        freeEventsByRoom
                                            ? freeEventsByRoom[room.id]
                                            : null
                                    }
                                    disabled={
                                        freeEventsByRoom
                                            ? !(freeEventsByRoom[room.id].length)
                                            : false
                                    }
                                />
                            ))
                        }
                    </RoomListFloorWrapperStyled>
                ))
                    : null
            }
        </RoomListStyled>
    </RoomListWrapperStyled>
);