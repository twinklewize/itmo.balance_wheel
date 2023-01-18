import React from 'react';
import classes from './BottomCalendar.module.scss';
import {Calendar} from "react-feather";
import IconButton from "../../../../UIKit/buttons/IconButton/IconButton";
import moment from "moment/moment";


function BottomCalendar({onClick, date}: {
    onClick: () => void;
    date: Date | undefined;
}) {
    return (
        <div className={classes.bottomCalendar}>
            {!date ?
                <IconButton onClick={onClick}>
                    <Calendar className={classes.icon}/>
                </IconButton>
                :
                <button className={classes.calendarWithDate}
                        onClick={onClick}>
                    <Calendar className={classes.icon}/>
                    <span>{moment(date).format('DD.MM.YYYY')}</span>
                </button>
            }
        </div>
    );
}

export default BottomCalendar;

