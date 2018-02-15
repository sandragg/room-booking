import React from "react";
import {Autocomplete} from "../autocomplete";
import {ChipList} from "../chip-list";
import {Column} from "../common-style";

export class AutocompleteChipsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItems: []
        };

        this.titleKey = props.titleKey;
        this.subtitleKey = props.subtitleKey;
        this.avatarKey = props.avatarKey;
        this.placeholder = props.placeholder;
        this.label = props.label;

        this.addItem = ::this.addItem;
        this.removeItem = ::this.removeItem;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedItems: nextProps.selectedItems.map(itemId =>
                nextProps.items.find(item => item.id === itemId)
            )
        });
    }

    addItem(itemId) {
        const index = this.state.selectedItems.findIndex(item => item.id === itemId);

        if (!~index)
            this.props.onPropChange(
                [...this.state.selectedItems.map(item => item.id), itemId]
            );
    }

    removeItem(itemId) {
        this.props.onPropChange(
            this.state.selectedItems.reduce((selected, item) =>
                item.id !== itemId
                    ? [...selected, item.id]
                    : selected
            , [])
        );
    }

    render() {
        return (
            <Column>
                <Autocomplete
                    {...this.props}
                    onItemSelect={this.addItem}
                />
                <ChipList
                    titleKey={this.titleKey}
                    avatarKey={this.avatarKey}
                    items={this.state.selectedItems}
                    onChipIconClick={this.removeItem}
                />
            </Column>
        );
    }
}
