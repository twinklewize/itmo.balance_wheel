import React, {useState} from 'react';
import classes from './Choosing.module.scss';
import IconFromText from "../../../../core/utils/IconFromText";
import {availableIcons} from "../../../../core/constants/constants";


function IconChoosing({defaultValue = availableIcons[0], onChange}: {
    defaultValue?: string;
    onChange: (icon: string) => void
}) {
    const [selectedIcon, setSelectedIcon] = useState<string>(defaultValue);

    function handleClick(icon: string) {
        setSelectedIcon(icon);
        onChange(icon);
    }

    return (
        <div className={classes.container}>
            <h4>Иконка</h4>
            <div className={classes.content}>
                {availableIcons.map((icon) => (
                    <button key={icon} onClick={() => {
                        handleClick(icon)
                    }}
                            className={selectedIcon == icon ? classes.activeIcon : classes.icon}>
                        <IconFromText text={icon}/>
                    </button>
                ))}
            </div>
        </div>

    );
}

export default IconChoosing;

