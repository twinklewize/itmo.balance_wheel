import React from 'react';
import classes from './BottomTabBar.module.scss';
import {CheckSquare, Calendar, Clock, PieChart} from "react-feather";
import {NavLink} from "react-router-dom";

const setActive = (props: { isActive: boolean }): string => props.isActive ? classes.iconActive : classes.icon;

const BottomTabBar: React.FC = () => {
    return (
        <nav className={classes.tabBar}>
            <div className={classes.icons}>
                <NavLink to={"tasks"} className={setActive}>
                    <CheckSquare/>
                </NavLink>
                <NavLink to={"calendar"} className={setActive}>
                    <Calendar/>
                </NavLink>
                <NavLink to={"habits"} className={setActive}>
                    <Clock/>
                </NavLink>
                <NavLink to={"spheres"} className={setActive}>
                    <PieChart/>
                </NavLink>
            </div>
        </nav>
    );
};



export default BottomTabBar;

