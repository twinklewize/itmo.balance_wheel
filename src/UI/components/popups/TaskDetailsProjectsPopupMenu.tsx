import React from "react";
import classes from './PopupMenu.module.scss';
import PopupMenu from "./PopupMenu";
import {ChevronDown, List} from "react-feather";
import getProjectName from "../../../core/utils/getProjectName";
import {useProjectsValue} from "../../../data/context/projectsContext";
import TasksService from "../../../data/services/TasksService";


function TaskDetailsProjectsPopupMenu({taskId, projectId}: { taskId: string, projectId?: string }) {
    let projects = useProjectsValue().projects;
    let currentProjectName = projects.find(p=>p.id == projectId)?.name;
    const [isActive, setIsActive] = React.useState(false);

    function handleChange(newProjectId: string) {
        if (projectId == newProjectId) return;
        TasksService.updateProject(taskId, newProjectId).then()
    }


    return (
        <PopupMenu
            setActive={setIsActive}
            button={
                <div className={classes.taskDetailsTitle}>
                    <h3>{getProjectName(currentProjectName)}</h3>
                    <ChevronDown style={isActive ? {transition: '300ms', transform: "rotate(180deg)"} : {
                        transition: '300ms',
                        transform: "rotate(0deg)"
                    }}/>
                </div>
            }
            className={classes.taskDetailsListsPopupStyle}>
            {projects.map((project) => <button
                key={project.id}
                className={project.id === projectId ? classes.activeListItem : classes.listItem}
                onClick={() => handleChange(project.id)}>
                <List className={classes.icon}/>
                <h5 className={classes.title}>{getProjectName(project.name)}</h5>
            </button>)}
        </PopupMenu>
    );
}

export default TaskDetailsProjectsPopupMenu;

