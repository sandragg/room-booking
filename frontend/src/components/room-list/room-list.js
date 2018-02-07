import React from "react";
import RoomListItem from "../room-list-item";
import {
    RoomListStyled,
    RoomListWrapperStyled,
    RoomListFloorStyled,
    RoomListFloorWrapperStyled
} from "./room-list-styled";

export default ({rooms, events}) => (
    <RoomListWrapperStyled>
        <RoomListStyled>
            {
                Object.keys(rooms).reverse().map(floor => (
                    <RoomListFloorWrapperStyled key={floor + "floor"}>
                        <RoomListFloorStyled>{floor} ЭТАЖ</RoomListFloorStyled>
                        {
                            rooms[floor].map(room => (
                                <RoomListItem
                                    key={room.title + "room"}
                                    roomId={room.id}
                                    title={room.title}
                                    subtitle={`до ${room.capacity} человек`}
                                    events={events.filter(event => event.room.id === room.id)}
                                />
                            ))
                        }
                    </RoomListFloorWrapperStyled>
                ))
            }
        </RoomListStyled>
    </RoomListWrapperStyled>
);