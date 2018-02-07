import React from "react";
import {
    SelectionListItemWrapper,
    SelectionListItemTitle,
    SelectionListItemSubtitle,
    SelectionListItemIconWrapper
} from "./selection-list-styled";
import {Icon} from "../icon";

export const SelectionListItem = ({type, title, subtitle, icon, iconColor, onItemClick, onIconClick}) => (
    <SelectionListItemWrapper onClick={onItemClick} type={type}>
        {icon &&
        <SelectionListItemIconWrapper>
            <Icon onClick={onIconClick} fill={iconColor} type={icon}/>
        </SelectionListItemIconWrapper>
        }
        <SelectionListItemTitle>{title}</SelectionListItemTitle>
        <SelectionListItemSubtitle>{subtitle}</SelectionListItemSubtitle>
    </SelectionListItemWrapper>
);
