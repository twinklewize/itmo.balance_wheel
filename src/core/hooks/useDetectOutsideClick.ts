import React, {useEffect, useState} from "react";
import {getRefValue} from "./getRefValue";

export const useDetectOutsideClick = (buttonRef: React.RefObject<HTMLButtonElement>, popupRef: React.RefObject<HTMLDivElement>, initialState: boolean) => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const onClick = (e: Event) => {
            setIsActive(getRefValue(buttonRef).contains(e.target as Node) || getRefValue(popupRef).contains(e.target as Node));
        };

        if (isActive) {
            window.addEventListener("click", onClick);
        }

        return () => {
            window.removeEventListener("click", onClick);
        };
    }, [isActive, popupRef]);

    return [isActive, setIsActive];
};