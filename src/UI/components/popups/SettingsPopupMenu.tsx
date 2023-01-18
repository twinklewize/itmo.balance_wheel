import React from "react";
import classes from './PopupMenu.module.scss';
import PopupMenu from "./PopupMenu";
import {Link} from "react-router-dom";
import {MoreVertical, Settings} from "react-feather";


function SettingsPopupMenu() {
    return (
        <PopupMenu button={<MoreVertical/>} className={classes.settingsPopupStyle}>
            <Link to={"/settings"} className={classes.listItem}>
                <Settings className={classes.icon}/>
                <h5 className={classes.title}>Настройки</h5>
            </Link>
        </PopupMenu>
    );
}

export default SettingsPopupMenu;

