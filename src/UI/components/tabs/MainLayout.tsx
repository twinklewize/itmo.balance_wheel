import React from 'react';
import {Outlet} from "react-router-dom";
import BottomTabBar from "../navigation/BottomTabBar/BottomTabBar";

function MainLayout() {
    return (
        <>
            <Outlet/>
            <BottomTabBar/>
        </>
    );
}

export default MainLayout;