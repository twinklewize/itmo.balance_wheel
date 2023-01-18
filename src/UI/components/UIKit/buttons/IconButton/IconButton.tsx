import React, {ReactNode} from 'react';
import classes from './IconButton.module.scss';

function IconButton({children, onClick}: {
    children: ReactNode;
    onClick: () => void;
}) {
    return (
        <button onClick={onClick} className={classes.iconButton}>
            {children}
        </button>
    );
}

export default IconButton;

