import React from "react";
import {
    TimeTickerContentStyled,
    TimerTickerDividerStyled,
    TimerTickerWrapperStyled
} from "./time-ticker-styled";

export default ({time, offset}) => {
    const hour = parseInt(time.split(":")[0]);
    const isTimeInRange = hour >= 8 && hour < 23;

    const ticker = (
        <TimerTickerWrapperStyled offset={offset}>
            <TimeTickerContentStyled>
                <span>{time}</span>
                <TimerTickerDividerStyled/>
            </TimeTickerContentStyled>
        </TimerTickerWrapperStyled>
    );

    return (
        isTimeInRange ? ticker : null
    );
}