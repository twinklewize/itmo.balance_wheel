import React, {useEffect, useState} from 'react';
import SpheresTabSuccessState from "./SpheresTabSuccessState";
import TabsLoadingState from "../TabsLoadingState";
import {SphereModel} from "../../../../domain/models/SphereModel";
import useDebounce from "../../../../core/hooks/useDebounce";
import {useTasksContext} from "../../../../data/context/tasksContext";
import {useSpheresContext} from "../../../../data/context/spheresContext";
import SpheresService from "../../../../data/services/SpheresService";

const SpheresTab: React.FC = (): JSX.Element => {
    let tasksContext = useTasksContext();
    let sphereContext = useSpheresContext();
    let isLoading = tasksContext.isLoading || sphereContext.isLoading;

    useEffect(() => {
        setCachedSpheres(sphereContext.spheres);
    }, [sphereContext.spheres])


    function updateSatisfaction(sphere: SphereModel, spheres: SphereModel[], targetValue: number, previousValue: number, sphereIndex: number) {
        SpheresService.updateSatisfaction(sphere.id, targetValue).catch(() => {
            spheres[sphereIndex] = {...sphere, satisfaction: previousValue};
            setCachedSpheres(spheres)
        })
    }

    const debouncedSatisfactionUpdate = useDebounce(updateSatisfaction, 1000);

    const selectScore = (sphereId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const targetValue = Number(e.target.value);
        const newSpheres: SphereModel[] = [...cachedSpheres];
        let sphereIndex = newSpheres.findIndex(s => s.id == sphereId);
        let sphere = newSpheres[sphereIndex];
        let previousValue = sphere.satisfaction;
        newSpheres[sphereIndex] = {...sphere, satisfaction: targetValue};

        setCachedSpheres(newSpheres)
        debouncedSatisfactionUpdate(
            sphere,
            newSpheres,
            targetValue,
            previousValue,
            sphereIndex,
        )
    }

    const [cachedSpheres, setCachedSpheres] = useState<SphereModel[]>([])
    let spheresMap: { [key: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } } = {};
    cachedSpheres?.forEach((sphere) => {
        let sphereTasks = tasksContext.tasks.filter((task) => task.spheresIds.includes(sphere.id));
        let completedSphereTasks = sphereTasks.filter(task => task.isChecked);
        spheresMap[sphere.id] = {
            sphere: sphere,
            completedTasksCount: completedSphereTasks.length,
            allTasksCount: sphereTasks.length,
        }
    });

    switch (isLoading) {
        case true:
            return (<TabsLoadingState text={'Загрузка сфер жизни...'}/>)
        case false:
            return (<SpheresTabSuccessState spheresMap={spheresMap} selectScore={selectScore}/>)
    }
};

export default SpheresTab;