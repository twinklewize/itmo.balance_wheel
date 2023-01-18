import * as React from 'react';
import {useState, useEffect} from 'react';
import classes from './Calendar.module.scss';
import {ChevronLeft, ChevronRight} from "react-feather";
import IconButton from "../../buttons/IconButton/IconButton";
import {isLeapYear, isSameDates} from "../../../../../core/utils/DateUtils";

function Calendar({calendarType = CalendarType.week, onChange, defaultDate = null}: {
    calendarType?: CalendarType,
    onChange?: (date: Date) => void;
    defaultDate?: Date | null;
}) {
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(!defaultDate ? currentDate : defaultDate);
    const [date, setDate] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
    }, [date]);

    useEffect(() => {
        onChange?.(selectedDate);
    }, [selectedDate]);




    const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

    function backButtonHandle() {
        calendarType === CalendarType.month ?
            setDate(new Date(year, month - 1, 1)) :
            setDate(new Date(year, month, day - 7))
    }

    function forwardButtonHandle() {
        calendarType === CalendarType.month ?
            setDate(new Date(year, month + 1, 1)) :
            setDate(new Date(year, month, day + 7))
    }

    function getDates(): Date[] {
        let array = [];

        if (calendarType === CalendarType.month) {
            let previousMonthDays = (new Date(year, month, 0)).getDay();
            for (let i = previousMonthDays; i > 0; i--) {
                array.push(new Date(year, month, 1 - i));
            }

            for (let i = 0; i < days[month]; i++) {
                array.push(new Date(year, month, i + 1));
            }

            while (array.length < 7 * 6) {
                let lastDate: Date = array[array.length - 1];
                array.push(new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1));
            }
        }

        if (calendarType === CalendarType.week) {
            let previousDays = date.getDay() - 1;

            for (let i = 0; i < 7; i++) {
                array.push(new Date(year, month, day + i - previousDays));
            }
        }

        return array;
    }


    function getMonthAndYear() {
        let dates = getDates();
        let firstDate = dates[0];
        let lastDate = dates[dates.length - 1];

        let firstDateMonth = firstDate.getMonth();
        let lastDateMonth = lastDate.getMonth();

        let firstDateYear = firstDate.getFullYear();
        let lastDateYear = lastDate.getFullYear();

        if (firstDateMonth === lastDateMonth || calendarType == CalendarType.month)
            return `${MONTHS[month]} ${year}`;

        if (firstDateYear == lastDateYear)
            return `${MONTHS[firstDateMonth]} — ${MONTHS[lastDateMonth]} ${firstDateYear}`;

        return `${MONTHS[firstDateMonth]} ${firstDateYear} — ${MONTHS[lastDateMonth]} ${lastDateYear}`;
    }

    return (
        <div className={classes.frame}>
            <div className={classes.header}>
                <div>{getMonthAndYear()}</div>
                <div className={classes.chevrons}>
                    <IconButton onClick={backButtonHandle}>
                        <ChevronLeft className={classes.chevron}/>
                    </IconButton>
                    <IconButton onClick={forwardButtonHandle}>
                        <ChevronRight className={classes.chevron}/>
                    </IconButton>
                </div>
            </div>

            <div className={classes.daysOfWeek}>
                {DAYS_OF_THE_WEEK.map((day) => (
                    <div className={classes.dayOfWeek} key={day}>
                        {day}
                    </div>
                ))}
            </div>

            <div className={classes.body}>
                {getDates().map((date, index) => {
                    const className =
                        (isSameDates(date, selectedDate) ?
                            classes.selectedDay :
                            (isSameDates(date, currentDate)
                                ? classes.today :
                                date.getMonth() != month ?
                                    classes.anotherMonth :
                                    classes.day));
                    return (
                        <div key={index} className={className} onClick={() => setSelectedDate(date)}>
                            {date.getDate()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export enum CalendarType {
    week,
    month
}


export default Calendar;