import React from "react";
import {ChipWrapper, ChipTitle} from "./chip-styled";
import {Avatar} from "../avatar";
import {Icon} from "../icon";

export class Chip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };

        this.hover = ::this.hover;
        this.unHover = ::this.unHover;
    }

    hover() {
        this.setState({hover: true});
    }

    unHover() {
        this.setState({hover: false});
    }

    render() {
        return (
            <ChipWrapper
                onMouseOver={this.hover}
                onMouseOut={this.unHover}
            >
                <Avatar url={this.props.avatarUrl}/>
                <ChipTitle>{this.props.children}</ChipTitle>
                <Icon
                    hover={this.state.hover}
                    onClick={this.props.onIconClick}
                    type="close"
                />
            </ChipWrapper>
        );
    }
}
