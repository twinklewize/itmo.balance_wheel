import React from 'react';
import classes from './SubtasksList.module.scss';
import {Plus} from "react-feather";
import Accordion from "../../containers/Accordion/Accordion";
import {TaskModel} from "../../../../../domain/models/TaskModel";
import Subtask from "../Task/Subtask";

function SubtasksList({task, setOpenModal, setSubtaskIndex}: {
    task: TaskModel,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    setSubtaskIndex:  React.Dispatch<React.SetStateAction<number | undefined>>
}) {
    let subTasks = task.subTasks;
    if (subTasks.length === 0)
        return (
            <button
                onClick={() => setOpenModal(true)}
                className={classes.addSubtaskButton}>
                <Plus/>
                <p>Добавить подзадачу</p>
            </button>
        )
    return (
        <div className={classes.lightContainer}>
            <Accordion title={<h5>Подзадачи</h5>}>
                {subTasks.map((subtask, index) =>
                    <Subtask key={index} onClick={()=>{
                        setOpenModal(true)
                        setSubtaskIndex(index)
                    }} task={task} subtaskIndex={index}/>)}
            </Accordion>
            <button
                onClick={() => {
                    setOpenModal(true)
                    setSubtaskIndex(undefined)
                }}
                className={classes.addSubtaskButton}
                style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
                <Plus/>
                <p>Добавить подзадачу</p>
            </button>
        </div>
    );
};

export default SubtasksList;

