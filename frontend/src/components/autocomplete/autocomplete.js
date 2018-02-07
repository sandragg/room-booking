import React from "react";
import ReactAutocomplete from 'react-autocomplete';
import {AutocompleteItem} from "./autocomplete-item";
import {AutocompleteIcon} from "./autocomplete-icon";
import {
    AutocompleteInputWrapper,
    AutocompleteMenuWrapper,
    AutocompleteWrapper,
    AutocompleteLabel
} from "./autocomplete-styled";

export class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            icon: "arrowDown"
        };

        this.titleKey = props.titleKey;
        this.subtitleKey = props.subtitleKey;
        this.avatarKey = props.avatarKey;

        this.onChange = ::this.onChange;
        this.onSelect = ::this.onSelect;
        this.defaultRenderItem = ::this.defaultRenderItem;
        this.defaultRenderInput = ::this.defaultRenderInput;
        this.defaultGetItemValue = ::this.defaultGetItemValue;
        this.defaultShouldItemRender = ::this.defaultShouldItemRender;
        this.defaultOnMenuVisibilityChange = ::this.defaultOnMenuVisibilityChange;

        this.shouldItemRender = props.shouldItemRender || this.defaultShouldItemRender;
        this.getItemValue = props.getItemValue || this.defaultGetItemValue;

        this.inputProps = {
            placeholder: props.placeholder
        };

        this.menuStyle = {
            padding: "2px 0",
            fontSize: "90%",
            position: "fixed",
            overflow: "auto",
            maxHeight: "50%",
            background: "#FFFFFF",
            boxShadow: "0 1px 10px 0 rgba(0,44,92,0.28)",
            borderRadius: "4px",
            height: "102px"
        };

        this.wrapperStyle = {
            display: "flex",
            width: "100%"
        }
    }

    defaultRenderItem(props, highlighted) {
        return (
            <div
                key={props.id}
                style={{backgroundColor: highlighted ? "#F6F7F9" : "transparent"}}
            >
                <AutocompleteItem
                    title={props[this.titleKey]}
                    subtitle={props[this.subtitleKey]}
                    avatar={props[this.avatarKey]}
                />
            </div>
        );
    }

    defaultRenderInput(props) {
        const {ref, ...restProps} = props;

        return <AutocompleteInputWrapper {...restProps} innerRef={ref}/>;
    }

    defaultRenderMenu(items, value, style) {
        return <AutocompleteMenuWrapper style={{...style, ...this.menuStyle}} children={items}/>
    }

    defaultShouldItemRender(item, value) {
        return item[this.titleKey].toLowerCase().includes(value.toLowerCase());
    }

    defaultGetItemValue(item) {
        return item[this.titleKey];
    }

    defaultOnMenuVisibilityChange(isOpen) {
        isOpen
            ? this.setState({icon: "arrowUp"})
            : this.setState({icon: "arrowDown", value: ""})
    }

    onChange(e) {
        this.setState({value: e.target.value, icon: "close"});
    }

    onSelect(value, item) {
        this.props.onItemSelect(item);
    }

    render() {
        return (
            <AutocompleteWrapper>
                <AutocompleteIcon
                    icon={this.state.icon}
                />
                <AutocompleteLabel>
                    {this.props.label}
                </AutocompleteLabel>
                <ReactAutocomplete
                    shouldItemRender={this.shouldItemRender}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    value={this.state.value}
                    renderItem={this.defaultRenderItem}
                    renderInput={this.defaultRenderInput}
                    renderMenu={this.defaultRenderMenu}
                    onMenuVisibilityChange={this.defaultOnMenuVisibilityChange}
                    getItemValue={this.getItemValue}
                    inputProps={this.inputProps}
                    menuStyle={this.menuStyle}
                    wrapperStyle={this.wrapperStyle}
                    {...this.props}
                />
            </AutocompleteWrapper>
        );
    }
}
