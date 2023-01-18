import React, {useState} from 'react';
import classes from './Choosing.module.scss';
import {Check} from "react-feather";
import {availableColors} from "../../../../core/constants/constants";

function ColorChoosing({defaultValue = availableColors[0], onChange}: {
    defaultValue?: string;
    onChange: (color: string) => void
}) {
    const [selectedColor, setSelectedColor] = useState<string>(defaultValue);

    function handleClick(color: string) {
        setSelectedColor(color);
        onChange(color);
    }

    return (
        <div className={classes.container}>
            <h4>Цвет</h4>
            <div className={classes.content}>
                {availableColors.map((color) => (
                    <button
                        onClick={() => handleClick(color)}
                        key={color}
                        style={{background: color}}
                        className={selectedColor === color ? classes.colorActive : classes.color}>
                        {selectedColor == color && <Check className={classes.colorCheckIcon}/>}
                    </button>))}
            </div>
        </div>
    );
}

export default ColorChoosing;

