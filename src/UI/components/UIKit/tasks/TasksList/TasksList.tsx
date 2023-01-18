import React from 'react';
import classes from './TasksList.module.scss';
import Task from "../Task/Task";
import {TaskModel} from "../../../../../domain/models/TaskModel";

interface Props {
    tasks: TaskModel[];
}

const TasksList: React.FC<Props> = ({tasks}) => {
    return (
       <div className={classes.darkContainer}>
           {tasks.map((task) => <Task key={task.id} task={task}/>)}
       </div>
    );
};

export default TasksList;

