import React, {useState} from 'react';
import Containers from './Containers';
import classes from './Chart.module.scss';
import {SphereModel} from "../../../../../domain/models/SphereModel";
import Chart from "./Chart";

export default function ChartWithContainers({defaultSpheres, withProgressBar = true, selectScore}: {
    defaultSpheres: { [key: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } };
    withProgressBar?: boolean;
    selectScore?: (question: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const [spheres, setSpheres] = useState(defaultSpheres);

    const localSelectScore = (sphereId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const targetValue = e.target.value;
        if (!targetValue) return;
        const newSpheres = {...spheres};
        newSpheres[sphereId].sphere.satisfaction = Number(targetValue);
        setSpheres(newSpheres)
    }

    return (
        <div className={classes.chartWithContainers}>
            <Chart spheres={!selectScore ? spheres : defaultSpheres}/>
            <Containers withProgressBar={withProgressBar}
                        spheres={!selectScore ? spheres : defaultSpheres}
                        selectScore={!selectScore ? localSelectScore : selectScore}/>
        </div>
    );
}