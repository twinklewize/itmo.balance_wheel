import React from 'react';
import classes from './Choosing.module.scss';
import Input, {BorderColor} from "../inputs/Input/Input";


function InputContainer({placeholder, onChange, value}: {
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
}) {
    return (
        <div className={classes.container}>
            <h4>Название</h4>
            <Input onChange={(e) => onChange?.(e.target.value)}
                   placeholder={placeholder}
                   borderColor={BorderColor.light}
                   value={value}/>
        </div>

    );
}

export default InputContainer;