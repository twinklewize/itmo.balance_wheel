import React from "react"
import classes from './PopupMenu.module.scss';
import PopupMenu from "./PopupMenu";
import {PieChart} from "react-feather";
import IconFromText from "../../../core/utils/IconFromText";
import {useSpheresContext} from "../../../data/context/spheresContext";


function CreateTaskSpheresPopupMenu({sphereIds, setSphereIds}: {
    sphereIds: string[],
    setSphereIds: React.Dispatch<React.SetStateAction<string[]>>,
}) {
    let spheres = useSpheresContext().spheres;
    function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, sphereId: string) {
        e.preventDefault();
        let isActive = sphereIds.includes(sphereId);
        if (isActive) {
            setSphereIds(sphereIds.filter(id => id != sphereId))
            return;
        }

        setSphereIds([...sphereIds, sphereId]);
    }

    return (
        <PopupMenu
            disable={spheres.length === 0}
            maxHeight={24}
            button={<PieChart className={sphereIds.length != 0 ? classes.activeIcon : classes.icon}/>}
            className={classes.createTaskSpheresPopupStyle}>
            {spheres.map((sphere) => {
                let isActive = sphereIds.includes(sphere.id);
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

export default CreateTaskSpheresPopupMenu;

