import React from "react";
import classes from './PopupMenu.module.scss';
import PopupMenu from "./PopupMenu";
import {List} from "react-feather";
import Badge, {BadgeType} from "../UIKit/special/Badge/Badge";
import getProjectName from "../../../core/utils/getProjectName";
import {useProjectsValue} from "../../../data/context/projectsContext";


function CreateTaskProjectsPopupMenu({projectId, setProjectId}: {
    projectId: string;
    setProjectId: React.Dispatch<React.SetStateAction<string>>;
}) {
    let projects = useProjectsValue().projects;
    let text = projects.filter((project) => {
        return project.id === projectId
    })[0].name;

    return (
        <PopupMenu
            maxHeight={24}
            disable={projects.length === 0}
            button={<Badge text={getProjectName(text)} badgeType={BadgeType.surface}/>}
            className={classes.createTaskProjectsPopupStyle}>
            {projects.map((project) =>
                <button key={project.id}
                        className={project.id === projectId ? classes.activeListItem : classes.listItem}
                        onClick={project.id === projectId ? () => {} : () => setProjectId(project.id)}>
                    <List className={classes.icon}/>
                    <h5 className={classes.title}>{getProjectName(project.name)}</h5>
                </button>)}
        </PopupMenu>
    );
}

export default CreateTaskProjectsPopupMenu;

