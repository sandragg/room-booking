import styled from 'styled-components';
import {Row, Column} from "../common-style";

export const RoomListWrapperStyled = styled(Row)`
  width: 100%;
  min-height: 100vh;
`;

export const RoomListStyled = styled.div`
  width: 100%
`;

export const RoomListTitleStyled = styled.span`
  font-family: HelveticaNeue-Bold;
  font-size: 11px;
  color: #858E98;
  letter-spacing: 0.4px;
  margin: 0 0 4px 0;
`;

export const RoomListFloorWrapperStyled = styled(Column)`
  padding-bottom: 20px;
`;

export const RoomListFloorStyled = styled.div`
  font-family: HelveticaNeue-Bold;
  font-size: 11px;
  color: #858E98;
  letter-spacing: 0.4px;
`;