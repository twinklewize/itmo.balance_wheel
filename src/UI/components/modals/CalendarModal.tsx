import React, {useState} from "react";
import Modal, {ModalType} from "../UIKit/containers/Modal/Modal";
import Calendar, {CalendarType} from "../UIKit/special/Calendar/Calendar";
import classes from "./modal.module.scss";
import Button, {ButtonSize, ButtonType} from "../UIKit/buttons/Button/Button";

function CalendarModal({setOpenModal, onChange, defaultValue = null}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onChange?: (date: Date | null) => void;
    defaultValue?: Date | null;
}) {
    const [date, setDate] = useState(defaultValue);

    function onDeleteHandle() {
        onChange?.(null);
        setOpenModal(false);
    }

    function onSubmitHandle() {
        setOpenModal(false);
        onChange?.(date);
    }

    function onChangeHandle(date: Date) {
        setDate(date);
    }

    function onCancelHandle(){
        setOpenModal(false);
    }

    return (
        <Modal setOpenModal={setOpenModal} modalType={ModalType.small}>
            <div className={classes.modal}>
                <Calendar calendarType={CalendarType.month}
                          onChange={onChangeHandle}
                          defaultDate={defaultValue}/>
                <div className={classes.buttonsWithSpaceBetween}>
                    <Button buttonText={'Удалить'}
                            onClick={onDeleteHandle}
                            type={ButtonType.secondary}
                            size={ButtonSize.smallest}/>
                    <div className={classes.buttons}>
                        <Button buttonText={'Отмена'}
                                onClick={onCancelHandle}
                                type={ButtonType.secondary}
                                size={ButtonSize.smallest}/>
                        <Button buttonText={'ОК'}
                                onClick={onSubmitHandle}
                                size={ButtonSize.smallest}/>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CalendarModal;