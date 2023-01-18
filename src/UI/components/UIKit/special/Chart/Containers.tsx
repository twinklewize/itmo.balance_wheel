import React from 'react';
import classes from './Chart.module.scss';
import ProgressBar from "./ProgressBar";
import {SphereModel} from "../../../../../domain/models/SphereModel";
import Slider from "./Slider";
import {Edit3} from "react-feather";
import {Link} from "react-router-dom";

function Containers({spheres, selectScore, withProgressBar}: {
    selectScore: (question: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    spheres: { [_: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } }
    withProgressBar: boolean;
}) {
    let sliders = Object.keys(spheres).map((sphereKey, i) => {
        let sphereElement = spheres[sphereKey];
        return (
            <div key={i} className={classes.container}>
                <div className={classes.containerHeader}>
                    <div className={classes.title}>{sphereElement.sphere.name}</div>
                    <Link to={`/sphere/edit/${sphereElement.sphere.id}`} className={classes.button}><Edit3/></Link>
                </div>
                {withProgressBar && <ProgressBar done={sphereElement.completedTasksCount} max={sphereElement.allTasksCount}/>}
                <span className={classes.hint}>Удовлетворенность</span>
                <Slider sphere={sphereElement.sphere} selectScore={selectScore}/>
            </div>)
    });
    return (
        <div className={classes.containersBloc}>
            {sliders}
        </div>
    );
}

export default Containers;