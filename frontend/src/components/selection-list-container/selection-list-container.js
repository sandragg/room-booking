import React from "react";
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
            selectedItem: {}
        };

        this.isEmpty = ::this.isEmpty;
        this.selectItem = ::this.selectItem;
        this.removeItem = ::this.removeItem;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedItem) {
            this.setState({
                selectedItem: nextProps.items.find(item =>
                    item.id === nextProps.selectedItem
                )
            });
        }
    }

    isEmpty(obj) {
        for (let key in obj) return false;

        return true;
    }

    selectItem(item) {
        this.setState(
            {selectedItem: item},
            () => this.props.onPropChange(this.state.selectedItem.id, "roomId")
        );
    }

    removeItem() {
        this.setState(
            {selectedItem: {}},
            () => this.props.onPropChange(null, "roomId")
        );
    }

    render() {
        let label, listItems, item;

        if (!this.isEmpty(this.state.selectedItem)) {
            item = this.state.selectedItem;
            label = "Ваша переговорка";
            listItems =
                <SelectionListItem
                    key={item.id}
                    type="primary"
                    title={`12:00 — 13:00`}
                    subtitle={`${item.title} · ${item.floor}`}
                    icon="close"
                    iconColor="#FFFFFF"
                    onIconClick={this.removeItem}
                />;
        } else {
            label = "Рекомендованные переговорки";
            listItems = this.props.items.map(item =>
                <SelectionListItem
                    key={item.id}
                    type="default"
                    title={`12:00 — 13:00`}
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
