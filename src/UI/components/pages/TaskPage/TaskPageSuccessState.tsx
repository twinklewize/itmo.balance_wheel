import React, {useEffect, useRef, useState} from 'react';
import {Trash2} from "react-feather";
import Content from "../../UIKit/containers/Content/Content";
import AppBar, {AppBarType} from "../../navigation/AppBar/AppBar";
import MainTask from "../../UIKit/tasks/Task/MainTask";
import SubtasksList from "../../UIKit/tasks/SubtasksList/SubtasksList";
import {TaskModel} from "../../../../domain/models/TaskModel";
import classes from './TaskPage.module.scss'
import BackArrow from "../../UIKit/buttons/BackArrow/BackArrow";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import Badges from "./components/Badges/Badges";
import BottomCalendar from "./components/BottomCalendar/BottomCalendar";
import TaskDetailsProjectsPopupMenu from "../../popups/TaskDetailsProjectsPopupMenu";
import ConfirmModal from "../../modals/ConfirmModal";
import CalendarModal from "../../modals/CalendarModal";
import {getRefValue} from "../../../../core/hooks/getRefValue";
import {useNavigate} from "react-router-dom";
import TasksService from "../../../../data/services/TasksService";
import {getDateFromTimestamp} from "../../../../core/utils/DateUtils";
import SubtaskModal from "../../modals/TaskModal/SubtaskModal";

function TaskPageSuccessState({task}: { task: TaskModel }) {
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [subtaskModalOpen, setSubtaskModalOpen] = useState(false);
    const [subtaskIndex, setSubtaskIndex] = useState<number | undefined>();
    let textareaRef = useRef<HTMLTextAreaElement>(null)
    const navigate = useNavigate();


    useEffect(() => {
        let current = getRefValue(textareaRef);
        current.style.height = "5px";
        current.style.height = current.scrollHeight + "px";
    }, []);

    function handleChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let description = event.target.value.trim();
        TasksService.updateDescription(task.id, description).then()
    }

    function handleInputDescription() {
        let current = getRefValue(textareaRef);
        current.style.height = "5px";
        current.style.height = current.scrollHeight + "px";
    }

    function handleDelete() {
        navigate('/tasks');
        TasksService.delete(task.id).catch(e => console.log(e));
    }

    function handleChangeDate(date: Date | null) {
        TasksService.updateDate(task.id, date).catch(e => console.log(e));
    }

    return (
        <>
            <div>
                <AppBar
                    title={(<TaskDetailsProjectsPopupMenu taskId={task.id} projectId={task.projectId}/>)}
                    leftIcon={(<BackArrow/>)}
                    rightIcon={(<IconButton onClick={() => setConfirmDeleteModalOpen(true)}><Trash2/></IconButton>)}
                    type={AppBarType.transparent}/>
                <Content>
                    <MainTask task={task}/>
                    <textarea
                        onChange={handleChangeDescription}
                        defaultValue={task.description}
                        ref={textareaRef}
                        placeholder={'Описание'}
                        className={classes.note}
                        onInput={handleInputDescription}>
                   </textarea>
                    <SubtasksList
                        setSubtaskIndex={setSubtaskIndex}
                        setOpenModal={setSubtaskModalOpen}
                        task={task}/>
                    <Badges task={task}/>
                </Content>
                <BottomCalendar
                    date={getDateFromTimestamp(task.date)}
                    onClick={() => setCalendarModalOpen(true)}/>
            </div>
            {calendarModalOpen && <CalendarModal
                onChange={handleChangeDate}
                setOpenModal={setCalendarModalOpen}/>}
            {confirmDeleteModalOpen && <ConfirmModal
                onConfirm={handleDelete}
                title={'Удалить задачу'}
                text={'Задание будет удалено из списка ваших задач'}
                setOpenModal={setConfirmDeleteModalOpen}/>}
            {subtaskModalOpen && <SubtaskModal
                task={task}
                subtaskIndex={subtaskIndex}
                setOpenModal={setSubtaskModalOpen}/>}
        </>
    );
};

export default TaskPageSuccessState;