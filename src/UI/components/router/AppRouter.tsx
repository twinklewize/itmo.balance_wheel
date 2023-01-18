import React from "react";
import {Route, Routes} from "react-router-dom";
import SignupPage from "../pages/SignupPage/SignupPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SphereChoosingPage from "../pages/SphereChoosingPage/SphereChoosingPage";
import SphereGradingPage from "../pages/SphereGradingPage/SphereGradingPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import MainLayout from "../tabs/MainLayout";
import TasksTab from "../tabs/TasksTab/TasksTab";
import CalendarTab from "../tabs/CalendarTab/CalendarTab";
import HabitsTab from "../tabs/HabitsTab/HabitsTab";
import SpheresTab from "../tabs/SpheresTab/SpheresTab";
import HabitPage, {HabitPageType} from "../pages/HabitPage/HabitPage";
import SpherePage, {SpherePageType} from "../pages/SpherePage/SpherePage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import TaskPage from "../pages/TaskPage/TaskPage";
import {PrivateRoutes} from "./PrivateRoutes";
import {PublicRoutes} from "./PublicRoutes";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path={"sphere/select"} element={<SphereChoosingPage/>}/>
                <Route path={"sphere/grade"} element={<SphereGradingPage/>}/>
                <Route path={"settings"} element={<SettingsPage/>}/>
                <Route path={"habit/create"} element={<HabitPage type={HabitPageType.create}/>}/>
                <Route path={"sphere/create"} element={<SpherePage type={SpherePageType.create}/>}/>
                <Route path={"habit/edit/:id"} element={<HabitPage type={HabitPageType.update}/>}/>
                <Route path={"sphere/edit/:id"} element={<SpherePage type={SpherePageType.update}/>}/>
                <Route path={"task/:id"} element={<TaskPage/>}/>
                <Route path="/" element={<MainLayout/>}>
                    <Route path={"tasks"} element={<TasksTab/>}/>
                    <Route path={"calendar"} element={<CalendarTab/>}/>
                    <Route path={"habits"} element={<HabitsTab/>}/>
                    <Route path={"spheres"} element={<SpheresTab/>}/>
                </Route>
            </Route>
            <Route element={<PublicRoutes/>}>
                <Route path={"signup"} element={<SignupPage/>}/>
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"welcome"} element={<WelcomePage/>}/>
            </Route>
        </Routes>
    )
}