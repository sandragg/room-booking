import React from "react";
import {Link} from "react-router-dom";
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
import {DialogBox} from "../dialog-box/dialog-box";
import forbid from "../../assets/images/emoji1.svg";
import success from "../../assets/images/emoji2.svg";

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
            roomId: null,
            isRemoved: false,
            isCreated: false
        };

        if (this.options) {
            const {event} = this.options;

            for (let key in event)
                this.state[key] = event[key];
        }

        if (!this.id) {
            this.title = "Новая встреча";
            this.footerContent = <Button primary onClick={()=>this.setState({isCreated: true})}>Создать встречу</Button>;
        } else {
            this.title = "Редактирование встречи";
            this.footerContent = (
                <Row>
                    <Button default onClick={() => this.setState({isRemoved: true})}>Удалить встречу</Button>
                    <Button default>Сохранить</Button>
                </Row>
            );
        }

        this.isEventValid = ::this.isEventValid;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event) {
            const {event} = nextProps;

            this.setState({
                title: event.title,
                membersIds: event.users.map(user => user.id),
                date: moment(event.dateStart).format("YYYY-MM-DD"),
                startTime: moment(event.dateStart).format("HH:mm"),
                endTime: moment(event.dateEnd).format("HH:mm"),
                roomId: event.room.id
            })
        }
    }

    isEventValid() {

    }

    render() {
        const {userList, roomList, removeEvent} = this.props;
        console.log(this.props);
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
                                       valid={this.state.title.length > 0}
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
                                    <InputWrapper basis="45">
                                        <Input
                                            type="date"
                                            label="Дата"
                                            grow="3"
                                            value={this.state.date}
                                            valid={moment(this.state.date, "YYYY-MM-DD", true).isValid()}
                                            onChange={(e) => this.setState({date: e.target.value})}
                                        />
                                    </InputWrapper>
                                    <InputWrapper basis="23">
                                        <Input
                                            type="time"
                                            label="Начало" grow="2"
                                            value={this.state.startTime}
                                            valid={moment(this.state.startTime, "HH:mm", true).isValid()}
                                            onChange={(e) => this.setState({startTime: e.target.value})}
                                        />
                                    </InputWrapper>
                                    <InputWrapper>
                                        <Divider>—</Divider>
                                    </InputWrapper>
                                    <InputWrapper basis="23">
                                        <Input
                                            type="time"
                                            label="Конец"
                                            value={this.state.endTime}
                                            valid={moment(this.state.endTime, "HH:mm", true).isValid()}
                                            onChange={(e) => this.setState({endTime: e.target.value})}
                                        />
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
                {
                    this.state.isRemoved
                        ? <DialogBox
                            title="Вы действительно хотите удалить встречу?"
                            subtitle={this.state.title}
                            text={`${moment(this.state.date).format("DD MMMM YYYY")}, ${this.state.startTime}`}
                            isDialog
                            img={forbid}
                            onClick={() => removeEvent(this.state.id)}
                        />
                        : null
                }
                {
                    this.state.isCreated
                        ? <DialogBox
                            title="Встреча была успешно создана!"
                            subtitle={this.state.title}
                            text={`${moment(this.state.date).format("DD MMMM YYYY")}, ${this.state.startTime}`}
                            img={success}
                        />
                        : null
                }
            </Column>
        )
    }
}

export const Edit = compose(
    actionCreators.createEvent,
    actionCreators.removeEvent,
    actionCreators.getEventById,
    actionCreators.getRoomList,
    actionCreators.getUserList
)(EditPage);
