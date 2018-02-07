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

        this.items = props.items;
        this.titleKey = props.titleKey;
        this.subtitleKey = props.subtitleKey;
        this.avatarKey = props.avatarKey;
        this.placeholder = props.placeholder;
        this.label = props.label;

        this.addItem = ::this.addItem;
        this.removeItem = ::this.removeItem;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.selectedItems) {
            this.setState({
                selectedItems: nextProps.selectedItems.map(itemId =>
                    nextProps.items.find(item => item.id === itemId)
                )
            });
        }
    }

    addItem(item) {
        this.setState(
            prevState => {
                const id = item.id;
                const index = prevState.selectedItems.findIndex(item => item.id === id);

                if (!~index) return {selectedItems: [...prevState.selectedItems, item]};

                return prevState;
            },
            () => this.props.onPropChange(
                this.state.selectedItems.map(item => item.id),
                "membersIds"
            )
        );
    }

    removeItem(itemId) {
        this.setState(
            prevState => ({
                selectedItems: prevState.selectedItems.filter(item => item.id !== itemId)
            }),
            () => this.props.onPropChange(
                this.state.selectedItems.map(item => item.id),
                "membersIds"
            )
        );
    }

    render() {
        console.log(this.state.selectedItems);
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
