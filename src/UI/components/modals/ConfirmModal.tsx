import React from "react";
import Modal, {ModalType} from "../UIKit/containers/Modal/Modal";
import Button, {ButtonSize, ButtonType} from "../UIKit/buttons/Button/Button";
import classes from "./modal.module.scss";

function ConfirmModal({setOpenModal, title, text, onConfirm}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string,
    text: string,
    onConfirm?: () => void,
}) {
    function onCancelHandle() {
        setOpenModal(false);
    }

    return (
        <Modal setOpenModal={setOpenModal} modalType={ModalType.small}>
            <div className={classes.modal}>
                <h4 style={{padding: 0, margin: 0}}>{title}</h4>
                <p className={classes.text}>
                    {text}
                </p>
                <div className={classes.buttons}>
                    <Button type={ButtonType.secondary}
                            buttonText={'Отмена'}
                            size={ButtonSize.small}
                            onClick={onCancelHandle}/>
                    <Button onClick={onConfirm}
                            buttonText={'Удалить'}
                            size={ButtonSize.small}/>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;