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
                    ? nextProps.items.find(item => item.id === nextProps.selectedItem)
                    : null
        });
    }

    selectItem(item) {
        this.props.onPropChange(item.id)
    }

    removeItem() {

        this.props.onPropChange(null)
    }

    render() {
        let label, listItems, item;
        const {event} = this.props;

        if (this.state.selectedItem) {
            item = this.state.selectedItem;
            label = "Ваша переговорка";
            listItems =
                <SelectionListItem
                    key={item.id}
                    type="primary"
                    title={`${event.startTime} — ${event.endTime}`}
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
                    title={`${event.startTime} — ${event.endTime}`}
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
