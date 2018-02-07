import React from "react";
import {
    TimeLineWrapperStyled,
    TimeLineHourStyled,
    TimeLineContentStyled
} from "./time-line-styled";
import TimeTicker from "../time-ticker";
import HourDivider from "../hour-divider";

export default ({hours, tickerTime, tickerOffset}) => {
    const currHour = tickerTime.split(":")[0];

    return (
        <TimeLineWrapperStyled>
            <TimeLineContentStyled>
                <TimeTicker time={tickerTime} offset={tickerOffset}/>
                {hours.map(hour =>
                    <TimeLineHourStyled key={hour + "hour"} disabled={hour <= currHour} >
                        {hour}
                        <HourDivider/>
                    </TimeLineHourStyled>
                )}
            </TimeLineContentStyled>
        </TimeLineWrapperStyled>
    );
}