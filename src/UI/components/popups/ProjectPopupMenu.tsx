import React from "react";
import classes from './PopupMenu.module.scss';
import PopupMenu from "./PopupMenu";
import {ProjectModel} from "../../../domain/models/ProjectModel";
import {Edit3, MoreVertical, Settings, Trash2} from "react-feather";
import {Link} from "react-router-dom";


function ProjectPopupMenu({setEditModalOpen, setDeleteConfirmModalOpen}: {
    setDeleteConfirmModalOpen: () => void;
    setEditModalOpen: () => void;
}) {
    return (
        <PopupMenu button={<MoreVertical/>} className={classes.settingsPopupStyle}>
            <Link to={"/settings"} className={classes.listItem}>
                <Settings className={classes.icon}/>
                <h5 className={classes.title}>Настройки</h5>
            </Link>
            <button className={classes.listItem} onClick={setEditModalOpen}>
                <Edit3 className={classes.icon}/>
                <h5 className={classes.title}>Редактировать</h5>
            </button>
            <button className={classes.listItem} onClick={setDeleteConfirmModalOpen}>
                <Trash2 className={classes.icon}/>
                <h5 className={classes.title}>Удалить</h5>
            </button>
        </PopupMenu>

    );
}

export default ProjectPopupMenu;

