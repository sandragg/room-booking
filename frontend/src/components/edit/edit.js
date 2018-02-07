import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";
import * as actionCreators from "../../actions";

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

        this.path = this.props.match.params.state;

        if (this.path === "create") {
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

        this.setDateValue = ::this.setDateValue;
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getRooms();
    }

    setDateValue(str) {
        const date = moment(str);
        const value = date.isValid() ? date : str;

        this.props.onPropChange(value, "dateStart");

        return value;
    }

    render() {
        console.log("event!!!", this.props.event);
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
                                       value={this.props.event.title}
                                       onChange={(e) => this.props.onPropChange(e.target.value, "title")}
                                />
                                <AutocompleteChipsContainer
                                    titleKey="login"
                                    subtitleKey="homeFloor"
                                    avatarKey="avatarUrl"
                                    placeholder="Например, Тор Одинович"
                                    label="Участники"
                                    selectedItems={this.props.event.membersIds}
                                    onPropChange={this.props.onPropChange}
                                    items={this.props.users}
                                />
                            </EditColumn>
                            <EditColumn>
                                <InputWrapper>
                                    <InputWrapper basis="57">
                                        <Input type="date"
                                               label="Дата"
                                               grow="3"
                                               value={this.props.event.date}
                                               onChange={(e) => this.props.onPropChange(e.target.value, "date")}/>
                                               {/*onChange={(e) => this.setDateValue(e.target.value)}/>*/}
                                    </InputWrapper>
                                    <InputWrapper basis="17">
                                        <Input label="Начало" grow="2"
                                               value={this.props.event.startTime}
                                               onChange={(e) => this.props.onPropChange(e.target.value, "startTime")}/>
                                    </InputWrapper>
                                    <InputWrapper>
                                        <Divider>—</Divider>
                                    </InputWrapper>
                                    <InputWrapper basis="17">
                                        <Input label="Конец"
                                               value={this.props.event.endTime}
                                               onChange={(e) => this.props.onPropChange(e.target.value, "endTime")}/>
                                    </InputWrapper>
                                </InputWrapper>
                                <SelectionListContainer
                                    onPropChange={this.props.onPropChange}
                                    items={this.props.rooms}
                                    selectedItem={this.props.event.roomId}
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

const mapStateToProps = (store) => ({
    event: store.event, // нужно передать уже обновленный event
    users: store.users,
    rooms: store.rooms
});

const mapDispatchToProps = (dispatch) => ({
    onPropChange: (prop, flag) => dispatch(actionCreators.editEventProp(prop, flag)),
    getUsers: () => dispatch(actionCreators.getUsers()),
    getRooms: () => dispatch(actionCreators.getRooms())
});

export const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage);
