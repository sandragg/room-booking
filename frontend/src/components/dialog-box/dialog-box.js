import React from "react";
import Modal from "../modal";
import {Link} from "react-router-dom";
import {
    OuterWrapper,
    DialogBoxWrapper,
    DialogBoxImage,
    DialogBoxTitle,
    DialogBoxSubtitle,
    DialogBoxText,
    DialogBoxSubmitWrapper
} from "./dialog-box-styled";
import {Button} from "../button/button-styled";

export const DialogBox = ({title, subtitle, text, isDialog, img, onSubmitClick, onCancelClick}) => {
    return (
        <Modal>
            <OuterWrapper/>
            <DialogBoxWrapper>
                <DialogBoxImage url={img}/>
                <DialogBoxTitle>{title}</DialogBoxTitle>
                <DialogBoxSubtitle>{subtitle}</DialogBoxSubtitle>
                <DialogBoxText>{text}</DialogBoxText>
                <DialogBoxSubmitWrapper>
                    <Link to="/">
                        <Button default onClick={onSubmitClick}>Ок</Button>
                    </Link>
                    {
                        isDialog
                            ? <Button default onClick={onCancelClick}>Отмена</Button>
                            : null
                    }
                </DialogBoxSubmitWrapper>
            </DialogBoxWrapper>
        </Modal>
    );
};
