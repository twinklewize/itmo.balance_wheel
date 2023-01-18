import React, {useState} from "react";
import classes from './TaskModal.module.scss';
import Modal from "../../UIKit/containers/Modal/Modal";
import {Send, Trash2} from "react-feather";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import TasksService from "../../../../data/services/TasksService";
import {TaskModel} from "../../../../domain/models/TaskModel";
import {removeItem} from "../../../../core/utils/removeItem";

function SubtaskModal({task, subtaskIndex, setOpenModal}: {
    subtaskIndex?: number;
    task: TaskModel,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    let subtask = subtaskIndex == undefined ? undefined : task.subTasks[subtaskIndex];
    const [name, setName] = useState<string>(subtask == undefined ? '' : subtask.name);

    function validation(): boolean {
        return name.trim().length != 0;
    }

    function onSubmitHandle() {
        if (!validation()) return;
        if (subtask == undefined) {
            let newSubtasks = [...task.subTasks, {isChecked: false, name: name}];
            TasksService.updateSubtasks(task.id, newSubtasks).then().catch(e => console.log(e));
        } else {
            let newSubtasks = [...task.subTasks];
            let isChecked = subtask.isChecked;
            subtask = {name: name, isChecked}
            TasksService.updateSubtasks(task.id, newSubtasks).then().catch(e => console.log(e));
        }
        setOpenModal(false);
    }

    function onDeleteHandle() {
        if (subtaskIndex == undefined) return;
        let newSubtasks = [...task.subTasks];
        newSubtasks = removeItem(newSubtasks, newSubtasks[subtaskIndex])
        TasksService.updateSubtasks(task.id, newSubtasks).then().catch(e => console.log(e));
        setOpenModal(false);
    }

    function onChangeHandle(event: React.ChangeEvent<HTMLTextAreaElement>){
        setName(event.target.value);
    }

    return (
        <>
            <Modal setOpenModal={setOpenModal}>
                <div className={classes.container}>
                    <textarea
                        onChange={onChangeHandle}
                        placeholder={'Что бы вы хотели сделать?'}
                        className={classes.taskInput}
                        value={name}>
                    </textarea>
                    <div className={classes.icons}>
                        {subtask != undefined && <div className={classes.controls}>
                            <IconButton onClick={onDeleteHandle}>
                                <Trash2 className={classes.icon}/>
                            </IconButton>
                        </div>}
                        <div/>
                        <IconButton onClick={onSubmitHandle}>
                            <Send className={!validation() ? classes.sendIconInactive : ''}/>
                        </IconButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default SubtaskModal;