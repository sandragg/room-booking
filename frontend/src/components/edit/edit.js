import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'react-apollo';
import * as actionCreators from "../../actions";
import moment from "moment";

import {
    ContentWrapper,
    Content,
    EditColumn,
    TitleWrapper,
    Form,
    InputWrapper,
    Divider
} from "./edit-styled";
import {Icon} from "../icon";
import {Input} from "../input";
import {AutocompleteChipsContainer} from "../autocomplete-chips-container";
import {SelectionListContainer} from "../selection-list-container";
import {Button} from "../button";
import {Header} from "../header";
import {Footer} from "../footer";
import {Column, Row} from "../common-style";

class EditPage extends React.Component {
    constructor(props) {
        super(props);

        this.id = props.match.params.id;
        this.options = props.location.state;
        this.state = {
            id: this.id | null,
            title: "",
            membersIds: [],
            date: "",
            startTime: "",
            endTime: "",
            roomId: null
        };

        if (this.options){
            const {event} = this.options;

            for(let key in event)
                this.state[key] = event[key];
        }

        if (!this.id) {
            this.title = "Новая встреча";
            this.footerContent = <Button primary>Создать встречу</Button>;
        } else {
            this.title = "Редактирование встречи";
            this.footerContent = (
                <Row>
                    <Button default>Удалить встречу</Button>
                    <Button default>Сохранить</Button>
                </Row>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event) {
            const {event} = nextProps;

            this.setState({
                title: event.title,
                membersIds: event.users.map(user => user.id),
                date: moment(event.dateStart).format("DD MM YYYY"),
                startTime: moment(event.dateStart).format("LT"),
                endTime: moment(event.dateEnd).format("LT"),
                roomId: event.room.id
            })
        }
    }

    render() {
        const {userList, roomList} = this.props;

        return (
            <Column>
                <Header/>
                <ContentWrapper>
                    <Content>
                        <TitleWrapper>
                            <span>{this.title}</span>
                            <Link to="/">
                                <Icon background type="close"/>
                            </Link>
                        </TitleWrapper>
                        <Form>
                            <EditColumn>
                                <Input label="Тема"
                                       placeholder="О чем будете говорить?"
                                       value={this.state.title}
                                       onChange={(e) => this.setState({title: e.target.value})}
                                />
                                <AutocompleteChipsContainer
                                    titleKey="login"
                                    subtitleKey="homeFloor"
                                    avatarKey="avatarUrl"
                                    placeholder="Например, Тор Одинович"
                                    label="Участники"
                                    selectedItems={this.state.membersIds}
                                    onPropChange={(ids) => this.setState({membersIds: ids})}
                                    items={userList || []}
                                />
                            </EditColumn>
                            <EditColumn>
                                <InputWrapper>
                                    <InputWrapper basis="57">
                                        <Input type="date"
                                               label="Дата"
                                               grow="3"
                                               value={this.state.date}
                                               onChange={(e) => this.setState({date: e.target.value})}/>
                                    </InputWrapper>
                                    <InputWrapper basis="17">
                                        <Input label="Начало" grow="2"
                                               value={this.state.startTime}
                                               onChange={(e) => this.setState({startTime: e.target.value})}/>
                                    </InputWrapper>
                                    <InputWrapper>
                                        <Divider>—</Divider>
                                    </InputWrapper>
                                    <InputWrapper basis="17">
                                        <Input label="Конец"
                                               value={this.state.endTime}
                                               onChange={(e) => this.setState({endTime: e.target.value})}/>
                                    </InputWrapper>
                                </InputWrapper>
                                <SelectionListContainer
                                    onPropChange={(id) => this.setState({roomId: id})}
                                    items={roomList || []}
                                    selectedItem={this.state.roomId}
                                    event={this.state}
                                />
                            </EditColumn>
                        </Form>
                    </Content>
                </ContentWrapper>
                <Footer>
                    <Link to="/">
                        <Button default>Отмена</Button>
                    </Link>
                    {this.footerContent}
                </Footer>
            </Column>
        )
    }
}

const EditPageWithData = compose(
    actionCreators.getEventById,
    actionCreators.getRoomList,
    actionCreators.getUserList
)(EditPage);

const mapDispatchToProps = (dispatch) => ({
    onPropChange: (prop, flag) => dispatch(actionCreators.editEventProp(prop, flag))
});

export const Edit = connect(
    null,
    mapDispatchToProps
)(EditPageWithData);