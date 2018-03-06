import React from "react";
import {Link} from "react-router-dom";
import {compose} from 'react-apollo';
import {connect} from "react-redux";
import moment from "moment";

import {
    createEvent,
    removeEvent,
    updateEvent,
    getEventsByDate,
    getEventById,
    getRoomList,
    getUserList
} from "../../apollo-actions";
import {
    sortEventsByDate,
    groupFreeEventsByRoom,
    groupEventsByRoom
} from "../../actions/actions";
import {setDate} from "../../redux-actions/actions";
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

const empty = [];

class EditPage extends React.Component {
    constructor(props) {
        super(props);

        this.eventId = props.match.params.id;
        this.hasEventCreated = !!this.eventId;
        this.options = props.location.state;

        this.state = {
            id: null,
            title: "",
            usersIds: [],
            date: "",
            startTime: "",
            endTime: "",
            roomId: null,
            isRemoved: false,
            isUpdated: false,
            isCreated: false,
            freeEventsByRoom: null,
            freeRooms: null
        };

        if (this.options) {
            const {event} = this.options;

            if (props.date !== event.date) props.onDateChange(moment(event.date));
            for (let key in event) this.state[key] = event[key];
        }

        this.isEventValid = this.isEventValid.bind(this);
        this.searchFreeRooms = this.searchFreeRooms.bind(this);
        this.onRoomClick = this.onRoomClick.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);

        if (!this.hasEventCreated) {
            this.title = "Новая встреча";
            this.footerContent = <Button primary onClick={this.saveEvent}>Создать встречу</Button>;
        }
        else {
            this.title = "Редактирование встречи";
            //TODO remove room func
            this.footerContent = (
                <Row>
                    <Button default onClick={this.removeEvent}>Удалить встречу</Button>
                    <Button default data-event-id={this.eventId} onClick={this.saveEvent}>Сохранить</Button>
                </Row>
            );
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {startTime, endTime, date, freeEventsByRoom, roomId} = this.state;
        const {event, roomList} = this.props;
        const newDate = moment(date);

        if (this.hasEventCreated && !prevProps.event) return;
        if (date !== prevState.date) {
            const newState = {roomId: null};

            if (newDate.isValid()) {
                this.props.onDateChange(newDate);
            }
            else {
                newState.freeRooms = null;
            }

            return this.setState(newState);
        }
        if (startTime !== prevState.startTime || endTime !== prevState.endTime) {
            const newState = {
                roomId: prevState.roomId ? null : roomId,
                freeRooms: this.searchFreeRooms(freeEventsByRoom, this.state)
            };

            if (event) {
                const start = moment(event.dateStart);
                const end = moment(event.dateEnd);

                if (start.format("YYYY-MM-DD") === date) {
                    newState.freeRooms.push({
                        ...roomList.find(room => room.id === event.room.id),
                        time: [start.format(), end.format()]
                    });
                }
            }

            return this.setState(newState);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {event, eventList, roomList, date, onDateChange} = nextProps;
        const hasEventData = this.state.id;
        const eventListInit = eventList || this.props.eventList;
        const roomListInit = roomList || this.props.roomList;
        const eventInit = event || this.props.event;

        if (eventListInit && roomListInit) {
            let addToState;
            const start = eventInit ? moment(eventInit.dateStart) : null;
            const end = eventInit ? moment(eventInit.dateEnd) : null;

            if (this.hasEventCreated && eventInit && !hasEventData) {
                this.initialDate = eventInit.dateStart;
                if (start.format("DD MMMM YYYY") !== date) return onDateChange(start);

                addToState = {
                    id: eventInit.id,
                    title: eventInit.title,
                    usersIds: eventInit.users.map(user => user.id),
                    date: start.format("YYYY-MM-DD"),
                    startTime: start.format("HH:mm"),
                    endTime: end.format("HH:mm"),
                    roomId: eventInit.room.id
                }
            }
            else {
                const {startTime, endTime, date} = this.state;

                addToState = {startTime, endTime, date};
            }

            const freeEventsByRoom = groupFreeEventsByRoom(
                groupEventsByRoom(sortEventsByDate(eventListInit)),
                roomListInit,
                date
            );
            const freeRooms = this.searchFreeRooms(freeEventsByRoom, addToState);

            if (eventInit && start.format("YYYY-MM-DD") === addToState.date) {
                freeRooms.push({
                    ...roomListInit.find(room => room.id === eventInit.room.id),
                    time: [start.format(), end.format()]
                });
            }

            const newState = {
                ...addToState,
                freeEventsByRoom,
                freeRooms
            };

            this.setState(newState);
        }
    }

    saveEvent(e){
        const id = e.target.dataset.eventId;
        const {roomId, title, date, startTime, endTime, usersIds} = this.state;
        const day = moment(date, "YYYY-MM-DD", true);
        const start = moment(startTime, "HH:mm", true);
        const end = moment(endTime, "HH:mm", true);
        const {createEvent, updateEvent, event} = this.props;
        const data = {
            usersIds,
            roomId,
            input: {
                title,
                dateStart: day.set({hour: start.hour(), minute: start.minute()}).format(),
                dateEnd: day.set({hour: end.hour(), minute: end.minute()}).format()
            },
        };

        console.log("SAVE WITH DATA", id, data);

        if(this.isEventValid()){
            if(id){
                const lastDate = event.dateStart;

                return updateEvent({id, ...data, lastDate})
                    .then(res => this.setState({isUpdated: true}))
                    .catch(err => console.error(err));
            }

            return createEvent(data)
                .then(res => this.setState({isCreated: true}))
                .catch(err => console.error(err));
        }

        console.warn("[EditPage.saveEvent]: Event is not valid!", data);

        return null;
    }

    removeEvent(e){
        return this.setState({isRemoved: true});
    }

    searchFreeRooms(freeEventsByRoom, {startTime, endTime, date}) {
        if (!freeEventsByRoom) return [];

        const {roomList = []} = this.props;
        const timeStart = moment(startTime, "HH:mm", true),
            timeEnd = moment(endTime, "HH:mm", true),
            day = moment(date);
        const startDate = timeStart.isValid()
            ? moment(day).set({"hour": timeStart.hour(), "minute": timeStart.minute()})
            : day;
        const endDate = timeEnd.isValid() && timeEnd.isAfter(timeStart)
            ? moment(day).set({"hour": timeEnd.hour(), "minute": timeEnd.minute()})
            : day;
        let time;

        return roomList.reduce((freeRoomList, room) => {
            if (!freeEventsByRoom[room.id].length) return freeRoomList;

            time = freeEventsByRoom[room.id].find(duration => (
                moment(startDate).isBetween(duration[0], duration[1], null, '[)')
            ));
            if (!time) {
                time = freeEventsByRoom[room.id][0];
            }
            else {
                time = moment(endDate).isBetween(time[0], time[1], null, '(]') ? [startDate.format(), endDate.format()] : time
            }
            freeRoomList.push({...room, time});

            return freeRoomList;
        }, []);
    }

    onRoomClick(room) {
        if (!room) {
            return this.setState({roomId: null});
        }

        const {time, id} = room;

        this.setState({
            roomId: id,
            startTime: moment(time[0]).format("HH:mm"),
            endTime: moment(time[1]).format("HH:mm")
        });
    }

    isEventValid() {
        const {roomId, title} = this.state;

        return !(roomId === null || !title.length);
    }

    render() {
        const {userList, removeEvent} = this.props;
        const {
            title, date, startTime,
            endTime, roomId, usersIds,
            isRemoved, isCreated, isUpdated, freeRooms
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
                                />
                                <AutocompleteChipsContainer
                                    titleKey="login"
                                    subtitleKey="homeFloor"
                                    avatarKey="avatarUrl"
                                    placeholder="Например, Тор Одинович"
                                    label="Участники"
                                    selectedItems={usersIds}
                                    onPropChange={(ids) => this.setState({usersIds: ids})}
                                    items={userList || empty}
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
                                            onChange={(e) => this.setState({date: e.target.value})}
                                        />
                                    </InputWrapper>
                                    <InputWrapper basis="23">
                                        <Input
                                            type="time"
                                            label="Начало" grow="2"
                                            value={startTime}
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
                                            onChange={(e) => this.setState({endTime: e.target.value})}
                                        />
                                    </InputWrapper>
                                </InputWrapper>
                                <SelectionListContainer
                                    onRoomChange={(id) => this.onRoomClick(id)}
                                    items={freeRooms || empty}
                                    selectedItem={{roomId, startTime}}
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
                            onSubmitClick={() => removeEvent(this.eventId)}
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
                {
                    isUpdated
                        ? <DialogBox
                            title="Встреча была изменена!"
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
    updateEvent,
    getEventsByDate,
    getRoomList,
    getEventById,
    getUserList
)(EditPage);

const mapStateToProps = state => ({
    date: state.date
});

const mapDispatchToProps = dispatch => ({
    onDateChange: date => dispatch(setDate(date))
});

export const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPageWithData);
