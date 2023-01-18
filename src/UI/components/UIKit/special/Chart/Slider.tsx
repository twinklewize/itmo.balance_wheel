import React from 'react';
import classes from './Chart.module.scss';
import {SphereModel} from "../../../../../domain/models/SphereModel";

function Slider({sphere, selectScore}: {
    sphere: SphereModel;
    selectScore: (sphereId: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className={classes.slider}>
            <input
                className={classes.rangeInput}
                style={{background: sphere.color}}
                onChange={selectScore(`${sphere.id}`)}
                type="range"
                min="1"
                max="10"
                value={sphere.satisfaction}/>
            <span className={classes.score}>
                {sphere.satisfaction + '/10'}
            </span>
        </div>
    );
}

export default Slider;