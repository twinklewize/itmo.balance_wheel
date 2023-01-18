import React from 'react';
import classes from './Badges.module.scss';
import Badge from "../../../../UIKit/special/Badge/Badge";
import TaskDetailsProjectsPopupMenu from "../../../../popups/TaskDetailsSpheresPopupMenu";
import {useSpheresContext} from "../../../../../../data/context/spheresContext";
import {TaskModel} from "../../../../../../domain/models/TaskModel";

function Badges({task}: {
    onClick?: () => void;
    task: TaskModel,
}) {
    let spheres = useSpheresContext().spheres
    let sphereIds = task.spheresIds;
    let filteredSpheres = spheres.filter(sphere => sphereIds.includes(sphere.id));
    return (
        <div className={classes.badges}>
            <TaskDetailsProjectsPopupMenu task={task}/>
            {
                filteredSpheres.map(sphere => <Badge
                    key={sphere.id}
                    text={sphere.name}
                />)
            }
        </div>

    );
};

export default Badges;

