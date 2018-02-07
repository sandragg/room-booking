import styled from "styled-components";
import {Column, Row} from "../common-style";
import {ONE_HOUR_WIDTH} from "../constants";
import {RoomLineWrapperStyled} from "../room-line/room-line-styled";

export const EventWrapperStyled = styled(Column)`
  position: absolute;
  height: 100%;
  width: ${props => (props.width || ONE_HOUR_WIDTH) + "%"};
  left: ${props => (props.offset || 0) + "%" };
  background: #D5DFE9;
  border-radius: 2px;
  
  &:hover {
    background: #98a9b9;
  } 
  
  &:active{
    background: #8594a2;
  }
`;
