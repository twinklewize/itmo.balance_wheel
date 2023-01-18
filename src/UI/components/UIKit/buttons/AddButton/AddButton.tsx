import React, {useEffect} from 'react';
import {Plus} from "react-feather";
import classes from './AddButton.module.scss';

function AddButton({onClick = undefined}: {
    onClick?: () => void;
}) {
    const [style, setStyle] = React.useState({});
    useEffect(() => setStyle({scale: "1"}), []);

    return (
        <button className={classes.addButton} style={style} onClick={onClick}>
            <Plus/>
        </button>
    );
};

export default AddButton;

