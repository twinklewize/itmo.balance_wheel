import React from 'react';
import classes from './Choosing.module.scss';
import TopTabBar from "./TopTabBar/TopTabBar";


function HabitScheduleChoosing({onChange, defaultValue}: {
    defaultValue?: { type: string| null, schedule: string | null}
    onChange: (type: string | null, schedule: string | null) => void
}) {
    return (
        <div className={classes.container}>
            <h4>Частота</h4>
            <TopTabBar onHabitScheduleChange={onChange} defaultValue={defaultValue}/>
        </div>
    );
}

export default HabitScheduleChoosing;

