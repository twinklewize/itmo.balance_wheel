import React from 'react';
import {useParams} from "react-router-dom";
import TaskPageSuccessState from "./TaskPageSuccessState";
import {useProjectsValue} from "../../../../data/context/projectsContext";
import {useSpheresContext} from "../../../../data/context/spheresContext";
import {useTasksContext} from "../../../../data/context/tasksContext";
import LoadingIndicator from "../../UIKit/special/LoadingIndicator/LoadingIndicator";

const TaskPage: React.FC = (): JSX.Element => {
    const taskId = useParams().id;

    let projectsContext = useProjectsValue();
    let spheresContext = useSpheresContext();
    let tasksContext = useTasksContext();
    let isLoading = projectsContext.isLoading || spheresContext.isLoading || tasksContext.isLoading;
    let task = tasksContext.tasks.find(task => task.id == taskId);

    switch (isLoading || !task) {
        case true:
            return (<LoadingIndicator/>)
        case false:
            return (<TaskPageSuccessState task={task!}/>);
    }
};

export default TaskPage;