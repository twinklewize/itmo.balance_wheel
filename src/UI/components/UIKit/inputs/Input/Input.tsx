import React from 'react';
import classes from './Input.module.scss';


function Input({
                   placeholder,
                   height = 40,
                   width,
                   borderColor = BorderColor.dark,
                   onChange,
                   type,
                   value,
                   maxLength,
                   defaultValue
               }: {
    placeholder?: string;
    height?: number;
    width?: number | undefined;
    borderColor?: BorderColor;
    type?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    maxLength?: number;
    defaultValue?: string,
}) {
    let className: string;
    switch (borderColor) {
        case BorderColor.dark:
            className = classes.darkInput;
            break;
        case BorderColor.light:
            className = classes.lightInput;
    }

    return (
        <div className={className}
             style={{height: height, width: width}}>
            <input
                defaultValue={defaultValue}
                maxLength={maxLength}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}/>
        </div>
    );
}

export const enum BorderColor {
    dark,
    light,
}

export default Input;

