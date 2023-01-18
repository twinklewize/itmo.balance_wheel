import React from 'react';
import classes from './Button.module.scss';

function Button({buttonText, onClick, size = ButtonSize.normal, type = ButtonType.primary}: {
    onClick?: () => void;
    buttonText: string,
    size?: ButtonSize,
    type?: ButtonType,
}) {
    let className: string;
    switch (type) {
        case ButtonType.secondary:
            className = size === ButtonSize.normal ? classes.secondaryButton : classes.smallSecondaryButton;
            break;
        case ButtonType.outlined:
            className = size === ButtonSize.normal ? classes.outlinedButton : classes.smallOutlinedButton;
            break;
        case ButtonType.primary:
            className = size === ButtonSize.normal ? classes.primaryButton : classes.smallPrimaryButton;
    }

    let style;
    switch (size) {
        case ButtonSize.smallest:
            style = {width: "auto"};
            break;
        case ButtonSize.small:
            style = {width: "100%"};
            break;
        case ButtonSize.normal:
            style = {width: "100%"};
    }

    return (
        <button className={className} style={style} onClick={onClick}>
            <p>{buttonText}</p>
        </button>
    );
};

export const enum ButtonSize {
    smallest,
    small,
    normal,
}

export const enum ButtonType {
    outlined,
    primary,
    secondary,
}

export default Button;