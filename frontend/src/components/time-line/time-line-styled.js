import styled, {css} from "styled-components";
import {Row, Column} from "../common-style";

export const TimeLineContentStyled = styled(Row)`
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  width: 100%;
`;

export const TimeLineHourStyled = styled(Column)`
  position: relative;
  font-family: HelveticaNeue-Bold;
  font-size: 11px;
  color: #252525;
  letter-spacing: 0.4px;
  font-weight: bold;
  width: 13px;
  align-items: center;
  
  ${props => props.disabled && css`color: #858E98`}
`;

export const TimeLineWrapperStyled = styled(Column)`
  margin: 0 20px 0px 20px;
  flex-grow: 1;
`;