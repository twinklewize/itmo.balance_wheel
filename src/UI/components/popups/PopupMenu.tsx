import React, {Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import classes from './PopupMenu.module.scss';
import {useDetectOutsideClick} from "../../../core/hooks/useDetectOutsideClick";


function PopupMenu({button, children, className, setActive, disable = false, maxHeight}: {
    button: ReactNode;
    children: ReactNode;
    className: string;
    setActive?: Dispatch<SetStateAction<boolean>>;
    disable?: boolean,
    maxHeight?: number,
}) {
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isActive, setIsActive] = useDetectOutsideClick(buttonRef, popupRef, false);

    useEffect(() => {
        if (setActive != null) setActive(isActive as boolean)
    }, [isActive])

    const onClick = () => {
        (setIsActive as React.Dispatch<React.SetStateAction<boolean>>)(!isActive);
    }

    let activeStyle: React.CSSProperties = {
        opacity: 1,
        visibility: "visible",
        transform: "translateY(0)",
        scale: "1",
    };

    return (
            <div style={{maxHeight: maxHeight}}>
                <button className={classes.button}
                        ref={buttonRef}
                        onClick={disable ? ()=>{} : onClick}>
                    {button}
                </button>
                <div ref={popupRef} className={className} style={isActive ? activeStyle : undefined}>
                    {children}
                </div>
            </div>
    );
}

export default PopupMenu;

