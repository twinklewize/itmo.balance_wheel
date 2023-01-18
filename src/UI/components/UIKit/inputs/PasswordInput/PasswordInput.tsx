import React, {useState} from 'react';
import classes from './PasswordInput.module.scss';
import {EyeOff, Eye} from "react-feather";

function PasswordInput({placeholder = 'Ваш пароль', onChange, value, height = 40}: {
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    value?: string,
    height?: number,
}) {
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<EyeOff className={classes.icon}/>);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(<Eye className={classes.icon}/>);
            setType('text');
        } else {
            setIcon(<EyeOff className={classes.icon}/>);
            setType('password');
        }
    }

    return (
        <div className={classes.input}>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                height={height}/>
            <span style={{padding: 0, margin: 0}} onClick={handleToggle}>{icon}</span>
        </div>
    );
}

export default PasswordInput;

