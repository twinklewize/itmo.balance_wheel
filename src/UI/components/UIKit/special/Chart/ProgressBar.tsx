import React from 'react';
import classes from './Chart.module.scss';

function ProgressBar({done, max}: { done: number, max: number }) {
    const [style, setStyle] = React.useState({});

    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${max == 0 ? 0 : done / max * 100}%`
        }
        setStyle(newStyle);
    }, 0);

    return (
        <>
            <span className={classes.hint}>Выполненные задачи</span>
            <div className={classes.progressBar}>
                <div className={classes.progress}>
                    <div className={classes.progressDone} style={style}>
                    </div>
                </div>
                <span className={classes.score}>
                    {max == 0 ? done : (done + `/${max}`)}
                </span>
            </div>
        </>
    )
}

export default ProgressBar;

