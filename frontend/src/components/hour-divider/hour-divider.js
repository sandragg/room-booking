import React from "react";
import {HourDividerStyled} from "./hour-divider-styled";

export default class HourDivider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: "100vh"
        }
    }
    //
    // componentDidMount() {
    //     this.setState({height: document.body.scrollHeight + "px"});
    // }

    render() {
        return <HourDividerStyled height={this.state.height}/>
    }
}