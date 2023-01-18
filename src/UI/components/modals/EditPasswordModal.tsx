import React from "react";
import Modal, {ModalType} from "../UIKit/containers/Modal/Modal";
import classes from "./modal.module.scss";
import Button, {ButtonSize, ButtonType} from "../UIKit/buttons/Button/Button";
import PasswordInput from "../UIKit/inputs/PasswordInput/PasswordInput";

function EditPasswordModal({setOpenModal}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    function onCancelHandle() {
        setOpenModal(false)
    }

    return (
        <Modal setOpenModal={setOpenModal} modalType={ModalType.small}>
            <div className={classes.modal}>
                <h4 style={{padding: 0, margin: 0}}>{'Новый пароль'}</h4>
                <PasswordInput placeholder={'Старый пароль'}/>
                <PasswordInput placeholder={'Новый пароль'}/>
                <div className={classes.buttons}>
                    <Button type={ButtonType.secondary}
                            buttonText={'Отмена'}
                            size={ButtonSize.small}
                            onClick={onCancelHandle}/>
                    <Button buttonText={'Сохранить'}
                            size={ButtonSize.small}/>
                </div>
            </div>
        </Modal>
    );
}

export default EditPasswordModal;