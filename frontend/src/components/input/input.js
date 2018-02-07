import React from "react";
import {
    InputContainerWrapper,
    InputLabel,
    InputWrapper,
    InputIcon
} from "./input-styled";
import {Icon} from "../icon";

export const Input = ({type, label, placeholder, value, onChange}) => (
    <InputContainerWrapper>
        {type === "date"
        && <InputIcon> <Icon type="date"/> </InputIcon>}
        <InputLabel>{label}</InputLabel>
        <InputWrapper placeholder={placeholder} value={value} onChange={onChange}/>
    </InputContainerWrapper>
);
