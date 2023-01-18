import React, {useState} from 'react';
import classes from './SquareCheckbox.module.scss';
import {CheckSquare, Square} from "react-feather";

function SquareCheckbox({defaultValue = false, onChange}: {
    defaultValue?: boolean;
    onChange?: (isChecked: boolean) => void
}) {
    const [isChecked, setIsChecked] = useState(defaultValue);

    function handleChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        setIsChecked(!isChecked);
        onChange?.(isChecked);
    }

    return (
        <button className={isChecked ? classes.checkboxActive : classes.checkbox} onClick={(e) => handleChange(e)}>
            {isChecked ? <CheckSquare/> : <Square/>}
        </button>

    );
}

export default SquareCheckbox;

