import React from 'react';
import classes from './Avatar.module.scss';

function Avatar({avatarURL, name, email}: {
    avatarURL?: string
    name?: string;
    email?: string;
}) {
    return (
        <div className={classes.avatar} >
            <h2 className={classes.name}>A</h2>
        </div>
    );
};

export default Avatar;

