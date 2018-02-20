import React from "react";
import styled from "styled-components";

export const BookingDateWrapperStyled = styled.div`
  height: 46px;
  width: 245px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BookingDateText = styled.span`
  font-family: HelveticaNeue-Medium;
  font-size: 15px;
  color: #000000;
  letter-spacing: 0;
  font-weight: bold;
  margin: 0 16px;
  &:hover {
    font-family: HelveticaNeue-Bold;
    font-size: 15px;
    color: #0070E0;
    letter-spacing: 0;
    cursor: pointer;
  }
`;