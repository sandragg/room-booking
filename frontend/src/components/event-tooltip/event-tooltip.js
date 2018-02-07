import React from "react";
import {Link} from "react-router-dom";
import {
    EventTooltipContentStyled,
    EventTooltipStyled,
    EventContentWrapperStyled,
    EventContentStyled,
    EventParticipantsStyled,
    EventParticipantsWrapperStyled,
    EventTitleStyled,
    EventParticipantsOtherStyled,
    EventMainParticipantStyled,
    EventIcon
} from "./event-tooltip-styled";
import moment from "moment";
import {Icon} from "../icon";

export default ({event, id, onIconClick}) => {
    const {title, dateStart, dateEnd, room, users} = event;
    const date = moment(dateStart, moment.ISO).format("DD MMM");
    const timeStart = moment(dateStart).format("LT");
    const timeEnd = moment(dateEnd).format("LT");
    const content = `${date}, ${timeStart} — ${timeEnd} · ${room.title}`;

    return (
        <EventTooltipStyled id={id}>
            <EventTooltipContentStyled>
                <EventContentWrapperStyled>
                    <EventTitleStyled>{title}</EventTitleStyled>
                    <Link to="edit">
                        <EventIcon>
                            <Icon background type="edit" onClick={onIconClick}/>
                        </EventIcon>
                    </Link>
                    <EventContentStyled>{content}</EventContentStyled>
                    <EventParticipantsWrapperStyled>
                        <EventParticipantsStyled>
                            <EventMainParticipantStyled>
                                {users[0].login}
                            </EventMainParticipantStyled>
                            &nbsp;
                            <EventParticipantsOtherStyled>
                                {`и ${users.length - 1} участников`}
                            </EventParticipantsOtherStyled>
                        </EventParticipantsStyled>
                    </EventParticipantsWrapperStyled>
                </EventContentWrapperStyled>
            </EventTooltipContentStyled>
        </EventTooltipStyled>
    );
};