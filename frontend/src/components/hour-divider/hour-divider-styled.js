import React from "react";
import styled from "styled-components";
import {Column} from "../common-style";

export const HourDividerStyled = styled(Column)`
  position: absolute;
  width: 1px;
  height: ${props => `calc(${props.height} + 22px)`}; // what?!
  flex-grow: 1;
  background: rgba(19,100,205,0.10);
  left: 50%;
  transform: translateX(-50%);
  margin-top: 16px;
`;