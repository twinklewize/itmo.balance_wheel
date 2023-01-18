import React from 'react';
import CalendarTabSuccessState from "./CalendarTabSuccessState";
import TabsLoadingState from "../TabsLoadingState";
import {useTasksContext} from "../../../../data/context/tasksContext";
import {useHabitsContext} from "../../../../data/context/habitsContext";

const CalendarTab: React.FC = (): JSX.Element => {
    let habitsContext = useHabitsContext();
    let tasksContext = useTasksContext();
    let isLoading = habitsContext.isLoading || tasksContext.isLoading;

    switch (isLoading) {
        case true:
            return (<TabsLoadingState/>)
        case false:
            return (<CalendarTabSuccessState habits={habitsContext.habits} tasks={tasksContext.tasks}/>)
    }
};

export default CalendarTab;