import React from 'react';
import TasksTabSuccessState from "./TasksTabSuccessState";
import TabsLoadingState from "../TabsLoadingState";
import {useProjectsValue} from "../../../../data/context/projectsContext";
import {useTasksContext} from "../../../../data/context/tasksContext";
import {useSpheresContext} from "../../../../data/context/spheresContext";

function TasksTab() {
    let projectsContext = useProjectsValue();
    let spheresContext = useSpheresContext();
    let tasksContext = useTasksContext();
    let isLoading = projectsContext.isLoading || spheresContext.isLoading || tasksContext.isLoading;

    switch (isLoading) {
        case true:
            return (<TabsLoadingState text={'Загрузка задач...'}/>)
        case false:
            return (<TasksTabSuccessState
                tasks={tasksContext.tasks}
                projects={projectsContext.projects}
                spheres={spheresContext.spheres}
                inboxId={projectsContext.inboxId}/>)
    }
}

export default TasksTab;