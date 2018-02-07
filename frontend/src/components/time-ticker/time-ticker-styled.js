import styled, {css} from "styled-components";
import {Column} from "../common-style";

export const TimeTickerContentStyled = styled(Column)`
  background: #007DFF;
  height: 20px;
  width: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  position: relative;
`;

export const TimerTickerDividerStyled = styled(Column)`
  width: 1px;
  height: ${props => props.height ? (props.height + "px") : "calc(100vh + 35px)"}; // what?!
  background: #007DFF;
  position: absolute;
  left: 50%;
  top: 20px;
`;

export const TimerTickerWrapperStyled = styled(Column)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  ${props => css`left: calc(${props.offset}% - ${25 - 6.5 * (100 - props.offset * 2) / 100}px)`};
  
  & span {
    font-family: HelveticaNeue-Bold;
    font-size: 11px;
    color: #FFFFFF;
    letter-spacing: 0.4px;
  }
`;