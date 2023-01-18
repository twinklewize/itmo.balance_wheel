import React from 'react';
import HabitsTabSuccessState from "./HabitsTabSuccessState";
import TabsLoadingState from "../TabsLoadingState";
import {useHabitsContext} from "../../../../data/context/habitsContext";

const HabitsTab: React.FC = (): JSX.Element => {
    let habitsContext = useHabitsContext();
    let isLoading = habitsContext.isLoading;

    switch (isLoading) {
        case true:
            return (<TabsLoadingState text={'Загрузка задач...'}/>)
        case false:
            return (<HabitsTabSuccessState habits={habitsContext.habits}/>);
    }
}

export default HabitsTab;