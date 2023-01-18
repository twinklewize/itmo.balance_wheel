import React from 'react';
import classes from './EmptyStatePlaceholder.module.scss';

interface Props {
    src: string,
    alt: string,
    title: string,
    hint: string,
}


const EmptyStatePlaceholder: React.FC<Props> = ({src, alt, title, hint}) => {
    return (
        <div className={classes.container}>
            <img alt={alt}   className={classes.image} src={src}/>
            <h4 className={classes.heading}>{title}</h4>
            <p className={classes.hint}>{hint}</p>
        </div>
    );
};

export default EmptyStatePlaceholder;

