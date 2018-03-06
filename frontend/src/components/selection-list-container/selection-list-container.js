import React from "react";
import moment from "moment";

import {
    SelectionListWrapper,
    SelectionListLabel,
    SelectionList
} from "./selection-list-styled";
import {SelectionListItem} from "./selection-list-item";

export class SelectionListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null
        };

        this.selectItem = ::this.selectItem;
        this.removeItem = ::this.removeItem;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedItem:
                nextProps.selectedItem
                    ? nextProps.items.find(item =>
                        item.id === nextProps.selectedItem.roomId
                        && nextProps.selectedItem.startTime === moment(item.time[0]).format("HH:mm")
                    )
                    : null
        });
    }

    selectItem(item) {
        this.props.onRoomChange(item);
    }

    removeItem() {
        this.props.onRoomChange(null);
    }

    render() {
        let label, listItems;
        const {selectedItem} = this.state;
        console.log(selectedItem, this.props.items);

        if (selectedItem) {
            label = "Ваша переговорка";
            listItems =
                <SelectionListItem
                    key={selectedItem.id}
                    type="primary"
                    title={`
                        ${moment(selectedItem.time[0]).format("HH:mm")}
                        —
                        ${moment(selectedItem.time[1]).format("HH:mm")}
                    `}
                    subtitle={`${selectedItem.title} · ${selectedItem.floor}`}
                    icon="close"
                    iconColor="#FFFFFF"
                    onIconClick={this.removeItem}
                />;
        } else {
            label = "Рекомендованные переговорки";
            listItems = this.props.items.map(item =>
                <SelectionListItem
                    key={`${item.id}${item.time[0]}`}
                    type="default"
                    title={`
                        ${moment(item.time[0]).format("HH:mm")}
                        —
                        ${moment(item.time[1]).format("HH:mm")}
                    `}
                    subtitle={`${item.title} · ${item.floor}`}
                    onItemClick={() => this.selectItem(item)}
                />
            );
        }

        return (
            <SelectionListWrapper>
                <SelectionListLabel>
                    {label}
                </SelectionListLabel>
                <SelectionList>
                    {listItems}
                </SelectionList>
            </SelectionListWrapper>
        );
    }
}
