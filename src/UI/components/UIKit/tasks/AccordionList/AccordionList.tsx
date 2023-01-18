import React from 'react';
import classes from './AccordionList.module.scss';
import Accordion from "../../containers/Accordion/Accordion";
import Habit from "../Habit/Habit";
import Task from "../Task/Task";
import {TaskModel} from "../../../../../domain/models/TaskModel";
import {SimpleHabitModel} from "../../../../../domain/models/HabitModel";

function AccordionList({tasks = [], habits = [], type}: {
    tasks?: TaskModel[];
    habits?: SimpleHabitModel[];
    type: AccordionListType,
}) {
    function getTitle(){
        switch (type){
            case AccordionListType.completed:
                return 'Завершено';
            case AccordionListType.habits:
                return 'Привычки'
        }
    }

    return (
        <div className={classes.lightContainer}>
            <Accordion title={<h5>{getTitle()}</h5>}>
                {tasks.map((task) => <Task key={`task ${task.id}`} task={task}/>)}
                {habits.map((habit) => <Habit key={`habit ${habit.id}`} habit={habit}/>)}
            </Accordion>
        </div>
    );
}

export const enum AccordionListType{
    completed,
    habits,
}

export default AccordionList;

