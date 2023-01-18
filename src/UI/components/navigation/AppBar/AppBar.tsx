import React from 'react';
import classes from './AppBar.module.scss';


function AppBar({
                    title = (<div/>),
                    type = AppBarType.primary,
                    rightIcon = (<div style={{width: "24px"}}/>),
                    leftIcon = (<div style={{width: "24px"}}/>)
                }: {
    title?: React.ReactNode;
    onClick?: () => void;
    type?: AppBarType,
    rightIcon?: React.ReactNode,
    leftIcon?: React.ReactNode,
}) {
    return (
        <div className={type == AppBarType.primary ? classes.primaryAppBar : classes.transparentAppBar}>
            {leftIcon}
            {title}
            {rightIcon}
        </div>
    );
}

export enum AppBarType {
    primary,
    transparent,
}

export default AppBar;

