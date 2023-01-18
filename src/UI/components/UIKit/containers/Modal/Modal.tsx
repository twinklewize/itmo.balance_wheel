import React, {useEffect} from "react";
import classes from './Modal.module.scss';

function Modal({setOpenModal, children, modalType = ModalType.default}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    modalType?: ModalType;
}) {
    const [style, setStyle] = React.useState({});


    useEffect(() => {
        document.body.style.overflow = "hidden"
        setStyle({opacity: 1});
    }, [])


    const handleClose = () => {
        document.body.style.overflow = ""
        setStyle({opacity: 0})
        setTimeout(() => {
            setOpenModal(false);
        }, 300);
    }

    return (
        <div>
            <div className={classes.modalBackground} style={style} onClick={handleClose}>
            </div>
            <div className={modalType == ModalType.default ? classes.modalContainer : classes.smallModalContainer}
                 style={style}>
                {children}
            </div>
        </div>

    );
}

export const enum ModalType {
    default,
    small
}

export default Modal;