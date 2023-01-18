import React from 'react';
import classes from './Task.module.scss';
import {TaskModel} from "../../../../../domain/models/TaskModel";
import SquareCheckbox from "../../checkboxes/SquareCheckbox/SquareCheckbox";
import TasksService from "../../../../../data/services/TasksService";


function Subtask({task, subtaskIndex, onClick}: { task: TaskModel, subtaskIndex: number, onClick: () => void }) {
    let subtask = task.subTasks[subtaskIndex];

    function handleCheck() {
        let newSubtasks = [...task.subTasks];
        let isChecked = !subtask.isChecked;
        let name = subtask.name
        newSubtasks[subtaskIndex] = {name: name, isChecked}
        TasksService.updateSubtasks(task.id, newSubtasks).then().catch(e => console.log(e));
    }

    return (
        <div onClick={onClick} className={subtask.isChecked ? classes.completedTask : classes.task}>
            <SquareCheckbox defaultValue={subtask.isChecked} onChange={handleCheck}/>
            <p>{subtask.name}</p>
        </div>
    );
}

export default Subtask;

