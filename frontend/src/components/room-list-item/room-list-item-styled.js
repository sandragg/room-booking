import styled, { css } from 'styled-components';
import {Row, Column} from "../common-style";

export const RoomListItemTitleStyled = styled.span`
  font-family: HelveticaNeue-Medium;
  font-size: 15px;
  padding-bottom: 2px;
  
  ${props => !props.disabled && css`
    ${RoomListItemStyled}:active & {
      font-family: HelveticaNeue-Bold;
      color: #1D54FE;
    }
    ${RoomListItemStyled}:hover & {
      font-family: HelveticaNeue-Bold;
      color: #0070E0;
    }
  `};
`;

export const RoomListItemWrapperStyled = styled(Row)`
  width: 100%;
  align-items: center;
`;

export const RoomListItemSubtitleStyled = styled.p`
  font-family: HelveticaNeue;
  font-size: 13px;
  margin: 0;
`;

export const RoomListItemStyled = styled(Column)`
  line-height: 17px;
  padding: 8px 0;
  width: 220px;
  
  ${props => props.disabled && css`
      color: #858E98;
  `};
`;