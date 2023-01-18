import {getAuth} from "firebase/auth";
import {Navigate, Outlet} from "react-router-dom";
import {ProjectsProvider} from "../../../data/context/projectsContext";
import {SpheresProvider} from "../../../data/context/spheresContext";
import {HabitsProvider} from "../../../data/context/habitsContext";
import {TasksProvider} from "../../../data/context/tasksContext";
import {firebaseApp} from "../../../data/firebase/firebase";

export const PrivateRoutes = () => {
    let isAuth = getAuth(firebaseApp).currentUser?.uid != undefined;

    if (!isAuth) return (<Navigate to={'/welcome'}/>)
    return (
        <ProjectsProvider>
            <SpheresProvider>
                <HabitsProvider>
                    <TasksProvider>
                        <Outlet/>
                    </TasksProvider>
                </HabitsProvider>
            </SpheresProvider>
        </ProjectsProvider>
    )
}