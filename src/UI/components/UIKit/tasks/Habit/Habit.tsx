import React from 'react';
import classes from './Habit.module.scss';
import {SimpleHabitModel} from "../../../../../domain/models/HabitModel";
import {useNavigate} from "react-router-dom";
import RoundCheckbox from "../../checkboxes/RoundCheckbox/RoundCheckbox";

function Habit({habit}: { habit: SimpleHabitModel }) {
    let navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/habit/edit/${habit.id}`)} style={{textDecoration: "none", color: "inherit"}}
             className={habit.isChecked ? classes.completedHabit : classes.habit}>
            <RoundCheckbox defaultValue={habit.isChecked} color={habit.color} onChange={habit.onCheck}/>
            <p>{habit.name}</p>
        </div>
    );
}

export default Habit;

