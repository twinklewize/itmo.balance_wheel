import React from 'react';
import classes from './Task.module.scss';
import {TaskModel} from "../../../../../domain/models/TaskModel";
import SquareCheckbox from "../../checkboxes/SquareCheckbox/SquareCheckbox";
import TasksService from "../../../../../data/services/TasksService";

function MainTask({task}: { task: TaskModel; }) {
    function handleChangeCheckbox() {
        TasksService.checkTask(task.id, !task.isChecked).then()
    }

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        let name = event.target.value.trim();
        TasksService.updateName(task.id, name).then()
    }

    return (
        <div className={task.isChecked ? classes.completedMainTask : classes.mainTask}
             style={{background: "transparent"}}>
            <SquareCheckbox defaultValue={task.isChecked} onChange={handleChangeCheckbox}/>
            <input defaultValue={task.name} onChange={handleChangeName}></input>
        </div>
    );
}

export default MainTask;