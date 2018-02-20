import React from "react";
import {
    InputContainerWrapper,
    InputLabel,
    InputWrapper,
    InputIcon
} from "./input-styled";
import {Icon} from "../icon";

export const Input = ({type, label, placeholder, value, valid, onChange}) => (
    <InputContainerWrapper>
        {/*{type === "date"*/}
        {/*&& <InputIcon> <Icon type="date"/> </InputIcon>}*/}
        <InputLabel>{label}</InputLabel>
        <InputWrapper type={type} placeholder={placeholder} value={value} valid={valid} onChange={onChange}/>
    </InputContainerWrapper>
);
