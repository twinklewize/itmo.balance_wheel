import React from 'react';
import classes from './Task.module.scss';
import {useNavigate} from "react-router-dom";
import {TaskModel} from "../../../../../domain/models/TaskModel";
import SquareCheckbox from "../../checkboxes/SquareCheckbox/SquareCheckbox";
import TasksService from "../../../../../data/services/TasksService";

function Task({task}: { task: TaskModel }) {
    let navigate = useNavigate();

    function handleChange() {
        TasksService.checkTask(task.id, !task.isChecked).then()
            .catch(e => console.log(e));
    }

    return (
        <div onClick={() => navigate(`/task/${task.id}`)}
             className={task.isChecked ? classes.completedTask : classes.task}>
            <SquareCheckbox defaultValue={task.isChecked} onChange={handleChange}/>
            <p style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "calc(100vw - 120px)"
            }}>{task.name}</p>
        </div>
    );
};

export default Task;

