import React from 'react';
import classes from "./LoadingIndicator.module.scss";


function LoadingIndicator() {
    return (<img alt={'Логотип'} className={classes.loadingIndicator} src={'/images/logo.svg'}></img>)
}

export default LoadingIndicator;

