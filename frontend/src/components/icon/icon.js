import React from "react";
import {IconWrapper} from "./icon-styled";
import {iconHash} from "./icon-hash";

export class Icon extends React.Component {
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
        const Icon = iconHash[this.props.type];

        return (
            <IconWrapper
                {...this.props}
                onMouseOver={this.hover}
                onMouseOut={this.unHover}
            >
                <Icon
                    fill={this.props.fill}
                    hover={this.props.hover || this.state.hover}
                />
            </IconWrapper>
        );
    }
}
