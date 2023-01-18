import React, {useState} from "react";
import classes from './modal.module.scss';
import Modal, {ModalType} from "../UIKit/containers/Modal/Modal";
import Button, {ButtonSize, ButtonType} from "../UIKit/buttons/Button/Button";
import Input from "../UIKit/inputs/Input/Input";

function InputModal({setOpenModal, title, placeholder, onSubmit, defaultValue}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string,
    placeholder: string,
    onSubmit: (value: string) => void,
    defaultValue?: string,
}) {
    const [value, setValue] = useState('')

    function onCancelHandle() {
        setOpenModal(false);
    }

    function onSubmitHandle() {
        onSubmit?.(value);
    }

    return (
        <Modal setOpenModal={setOpenModal} modalType={ModalType.small}>
            <div className={classes.modal}>
                <h4 style={{padding: 0, margin: 0}}>{title}</h4>
                <Input
                    maxLength={20}
                    onChange={e => setValue(e.target.value)}
                    defaultValue={defaultValue}
                    placeholder={placeholder}/>
                <div className={classes.buttons}>
                    <Button type={ButtonType.secondary}
                            buttonText={'Отмена'}
                            size={ButtonSize.small}
                            onClick={onCancelHandle}/>
                    <Button onClick={onSubmitHandle}
                            buttonText={'Сохранить'}
                            size={ButtonSize.small}/>
                </div>
            </div>
        </Modal>
    );
}

export default InputModal;