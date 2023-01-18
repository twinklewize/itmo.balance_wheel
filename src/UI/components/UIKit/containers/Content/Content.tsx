import React from 'react';
import classes from './Content.module.scss';

interface Props {
    children: React.ReactNode;
    gap?: number,
    marginBottom?: number,
}


const Content: React.FC<Props> = ({children, marginBottom = 0}) => {

    return (
        <div className={classes.container}>
            <div className={classes.content} style={{marginBottom: marginBottom}}>
                {children}
            </div>
        </div>
    );
};

export default Content;