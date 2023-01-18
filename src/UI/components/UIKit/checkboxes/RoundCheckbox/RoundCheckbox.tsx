import React, {useState} from 'react';
import classes from './RoundCheckbox.module.scss';
import {CheckCircle} from "react-feather";

function RoundCheckbox({defaultValue = false, onChange, color}: {
    defaultValue?: boolean;
    onChange?: (isChecked: boolean) => void;
    color: string;
}) {
    const [isChecked, setIsChecked] = useState(defaultValue);

    function handleChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        setIsChecked(!isChecked);
        onChange?.(isChecked);
    }

    return (
        <button className={classes.roundCheckbox} onClick={(e) => handleChange(e)}>
            {isChecked ? <CheckCircle color={color}/> :
                <div style={{background: color}}></div>}
        </button>
    );
}

export default RoundCheckbox;

