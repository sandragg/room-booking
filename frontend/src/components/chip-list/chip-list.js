import React from "react";
import {Chip} from "../chip";
import {Row} from "../common-style";

export const ChipList = ({avatarKey, titleKey, items, onChipIconClick}) => {
    const chipList = items.map(item =>
        <Chip
            key={item.id}
            avatarUrl={item[avatarKey]}
            onIconClick={() => onChipIconClick(item.id)}
        >
            {item[titleKey]}
        </Chip>
    );
    console.log("items", items);
    return (
        <Row style={{flexWrap: "wrap"}}>{chipList}</Row>
    );
};
