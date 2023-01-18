import React, {useEffect, useState} from 'react';
import classes from './Choosing.module.scss';
import {removeItem} from "../../../../core/utils/removeItem";
import {digitsFromStringNumber, stringNumberFromDigits} from "../../../../core/utils/digitsFromStringNumber";

function DayChoosing({value, onChange}: {
    value?: string | null;
    onChange: (value: string | null) => void;
}) {
    let days = ['П', 'В', 'C', 'Ч', 'П', 'С', 'В'];
    const [selectedDays, setSelectedDays] = useState<number[]>(!value ? [] : digitsFromStringNumber(value))

    useEffect(() => {
        setSelectedDays(!value ? [] : digitsFromStringNumber(value))
    }, [value])

    function handleChange(day: number) {
        let newDays = [...selectedDays];
        newDays.includes(day) ? removeItem(newDays, day) : newDays.push(day);
        onChange(newDays.length == 0 ? null : stringNumberFromDigits(newDays));
    }

    return (
        <div className={classes.dayChoosing}>
            {days.map((day, index) => (
                <button
                    onClick={() => handleChange(index)}
                    className={selectedDays.includes(index) ? classes.activeDay : classes.day}
                    key={`weekday ${index}`}>
                    <h4>{day}</h4>
                </button>
            ))}
        </div>
    );
}

export default DayChoosing;

