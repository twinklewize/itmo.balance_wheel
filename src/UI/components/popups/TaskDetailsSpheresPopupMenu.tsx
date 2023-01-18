import React from "react"
import classes from './PopupMenu.module.scss';
import PopupMenu from "./PopupMenu";
import Badge, {BadgeType} from "../UIKit/special/Badge/Badge";
import IconFromText from "../../../core/utils/IconFromText";
import {useSpheresContext} from "../../../data/context/spheresContext";
import {TaskModel} from "../../../domain/models/TaskModel";
import TasksService from "../../../data/services/TasksService";


function TaskDetailsProjectsPopupMenu({task}: {
    task: TaskModel,
}) {
    let spheresIds = task.spheresIds;
    let spheres = useSpheresContext().spheres;

    function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, sphereId: string) {
        e.preventDefault();
        let newSpheresIds: string[];
        let isActive = spheresIds.includes(sphereId);
        if (isActive) {
            newSpheresIds = spheresIds.filter(id => id != sphereId)
        } else {
            newSpheresIds = [...spheresIds, sphereId]
        }

        TasksService.updateSpheres(task.id, newSpheresIds).then();
    }


    return (
        <PopupMenu
            maxHeight={24}
            button={<Badge text={'Редактирование сфер'} badgeType={BadgeType.surface}/>}
            className={classes.taskDetailsSpheresPopupStyle}>
            {spheres.map((sphere) => {
                let isActive = spheresIds.includes(sphere.id);
                return <button key={sphere.id}
                               className={isActive ? classes.activeListItem : classes.listItem}
                               onClick={(e) => handleOnClick(e, sphere.id)}>
                    <div className={classes.icon}>
                        <IconFromText text={sphere.icon}/>
                    </div>
                    <h5 className={classes.title}>{sphere.name}</h5>
                </button>
            })}

        </PopupMenu>
    );
}

export default TaskDetailsProjectsPopupMenu;

