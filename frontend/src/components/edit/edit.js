import React from "react";
import {Link} from "react-router-dom";
import {compose} from 'react-apollo';
import {connect} from "react-redux";

import {
    createEvent,
    removeEvent,
    getEventsByDate,
    getEventById,
    getRoomList,
    getUserList
} from "../../apollo-actions";
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
            usersIds: [],
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
            this.footerContent = <Button primary onClick={() => this.isEventValid()}>Создать встречу</Button>;
        } else {
            this.title = "Редактирование встречи";
            this.footerContent = (
                <Row>
                    <Button default onClick={() => this.setState({isRemoved: true})}>Удалить встречу</Button>
                    <Button default>Сохранить</Button>
                </Row>
            );
        }

        this.isEventValid = this.isEventValid.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event) {
            const {event} = nextProps;

            this.setState({
                title: event.title,
                usersIds: event.users.map(user => user.id),
                date: moment(event.dateStart).format("YYYY-MM-DD"),
                startTime: moment(event.dateStart).format("HH:mm"),
                endTime: moment(event.dateEnd).format("HH:mm"),
                roomId: event.room.id
            })
        }
    }

    isEventValid() {
        const {roomId, title, date, startTime, endTime, usersIds} = this.state;
        let day = moment(date, "YYYY-MM-DD", true),
            start = moment(startTime, "HH:mm", true),
            end = moment(endTime, "HH:mm", true);
        let newEvent = {};

        if (roomId === null
            || !title.length
            || !day.isValid()
            || !start.isValid()
            || !end.isValid()
            || !end.isAfter(start)
            || start.hour() < 8 // убрать, когда будет ф-я подбора комнат
            || (end.hour() > 23 // убрать, когда будет ф-я подбора комнат
                || (end.hour() === 23 // убрать, когда будет ф-я подбора комнат
                    && end.minute())) // убрать, когда будет ф-я подбора комнат
        ) return;

        this.props.createEvent({
            usersIds,
            roomId,
            input: {
                title,
                dateStart: day.set({hour: start.hour(), minute: start.minute()}).format(),
                dateEnd: day.set({hour: end.hour(), minute: end.minute()}).format()
            }
        })
            .then(res => this.setState({isCreated: true}))
            .catch(err => console.error(err));


    }

    render() {
        const {userList, roomList, removeEvent} = this.props;
        const {
            title, date, startTime,
            endTime, roomId, usersIds,
            isRemoved, isCreated
        } = this.state;

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
                                       value={title}
                                       onChange={(e) => this.setState({title: e.target.value})}
                                       valid={title.length > 0}
                                />
                                <AutocompleteChipsContainer
                                    titleKey="login"
                                    subtitleKey="homeFloor"
                                    avatarKey="avatarUrl"
                                    placeholder="Например, Тор Одинович"
                                    label="Участники"
                                    selectedItems={usersIds}
                                    onPropChange={(ids) => this.setState({usersIds: ids})}
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
                                            value={date}
                                            valid={moment(date, "YYYY-MM-DD", true).isValid()}
                                            onChange={(e) => this.setState({date: e.target.value})}
                                        />
                                    </InputWrapper>
                                    <InputWrapper basis="23">
                                        <Input
                                            type="time"
                                            label="Начало" grow="2"
                                            value={startTime}
                                            valid={moment(startTime, "HH:mm", true).isValid()}
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
                                            value={endTime}
                                            valid={moment(endTime, "HH:mm", true).isValid()}
                                            onChange={(e) => this.setState({endTime: e.target.value})}
                                        />
                                    </InputWrapper>
                                </InputWrapper>
                                <SelectionListContainer
                                    onPropChange={(id) => this.setState({roomId: id})}
                                    items={roomList || []}
                                    selectedItem={roomId}
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
                    isRemoved
                        ? <DialogBox
                            title="Вы действительно хотите удалить встречу?"
                            subtitle={title}
                            text={`${moment(date).format("DD MMMM YYYY")}, ${startTime}`}
                            isDialog
                            img={forbid}
                            onSubmitClick={() => removeEvent(this.id)}
                            onCancelClick={() => this.setState({isRemoved: false})}
                        />
                        : null
                }
                {
                    isCreated
                        ? <DialogBox
                            title="Встреча была успешно создана!"
                            subtitle={title}
                            text={`${moment(date).format("DD MMMM YYYY")}, ${startTime}`}
                            img={success}
                        />
                        : null
                }
            </Column>
        )
    }
}

const EditPageWithData = compose(
    createEvent,
    removeEvent,
    getEventById,
    getEventsByDate,
    getRoomList,
    getUserList
)(EditPage);

const mapStateToProps = (store) => ({
    date: store.date
});

export const Edit = connect(
    mapStateToProps
)(EditPageWithData);
