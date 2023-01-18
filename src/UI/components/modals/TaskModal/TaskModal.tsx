import React, {useState} from "react";
import classes from './TaskModal.module.scss';
import Modal from "../../UIKit/containers/Modal/Modal";
import {Calendar, Send} from "react-feather";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import CalendarModal from "../CalendarModal";
import moment from 'moment';
import CreateTaskSpheresPopupMenu from "../../popups/CreateTaskSpheresPopupMenu";
import CreateTaskProjectsPopupMenu from "../../popups/CreateTaskProjectsPopupMenu";
import {ListType} from "../../tabs/TasksTab/TasksTabSuccessState";
import TasksService from "../../../../data/services/TasksService";
import {useProjectsValue} from "../../../../data/context/projectsContext";

function TaskModal({
                       setOpenModal,
                       defaultListId = null,
                       defaultListType = null,
                       defaultDate = null
                   }: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    defaultListId?: string | null,
    defaultListType?: ListType | null,
    defaultDate?: Date | null,
}) {
    let inboxId = useProjectsValue().inboxId;
    function getDefaultProjectId(): string {
        switch (defaultListType) {
            case ListType.project:
                return defaultListId as string
            default:
                return inboxId;
        }
    }

    function getDefaultSphereIds(): string[] {
        switch (defaultListType) {
            case ListType.sphere:
                return [defaultListId as string];
            default:
                return []
        }
    }

    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Date | null>(defaultDate);
    const [projectId, setProjectId] = useState<string>(getDefaultProjectId());
    const [spheresIds, setSpheresIds] = useState<string[]>(getDefaultSphereIds());

    function validation(): boolean {
        return name.trim().length != 0;
    }

    function handleSubmit() {
        if (!validation()) return;
        TasksService.createTask(name, projectId, spheresIds, date).then().catch(e => console.log(e));
        setOpenModal(false);
    }

    return (
        <>
            <Modal setOpenModal={setOpenModal}>
                <div className={classes.container}>
                    <textarea
                        maxLength={64}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={'Что бы вы хотели сделать?'}
                        className={classes.taskInput}
                        value={name}>
                    </textarea>
                    <div className={classes.icons}>
                        <div className={classes.controls}>
                            {
                                !date ?
                                    <IconButton onClick={() => setCalendarModalOpen(true)}>
                                        <Calendar className={classes.icon}/>
                                    </IconButton>
                                    :
                                    <button className={classes.calendarWithDate}
                                            onClick={() => setCalendarModalOpen(true)}>
                                        <Calendar className={classes.icon}/>
                                        <span>{moment(date).format('DD.MM.YYYY')}</span>
                                    </button>
                            }
                            <CreateTaskSpheresPopupMenu sphereIds={spheresIds}
                                                        setSphereIds={setSpheresIds}/>
                            <CreateTaskProjectsPopupMenu projectId={projectId}
                                                         setProjectId={setProjectId}/>
                        </div>
                        <IconButton onClick={handleSubmit}>
                            <Send className={!validation() ? classes.sendIconInactive : ''}/>
                        </IconButton>
                    </div>
                </div>
            </Modal>
            {calendarModalOpen && <CalendarModal
                defaultValue={date}
                setOpenModal={setCalendarModalOpen}
                onChange={date => setDate(date)}/>}
        </>
    );
}

export default TaskModal;