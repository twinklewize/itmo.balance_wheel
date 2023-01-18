import React from "react";
import classes from './modal.module.scss';
import Modal from "../UIKit/containers/Modal/Modal";
import Button, {ButtonType} from "../UIKit/buttons/Button/Button";

function EditAvatarModal({setOpenModal}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Modal setOpenModal={setOpenModal}>
            <div className={classes.modal}>
                <Button buttonText={'Выбрать фото'} type={ButtonType.secondary}/>
                <Button buttonText={'Удалить текущее фото'} type={ButtonType.secondary}/>
            </div>
        </Modal>
    );
}

export default EditAvatarModal;