import React from 'react';
import classes from './Chart.module.scss';
import {SphereModel} from "../../../../../domain/models/SphereModel";

function Sectors({sectors}: {
    sectors: { [_: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } }
}) {
    let length = Object.keys(sectors).length;

    let slices = Object.keys(sectors).map((sliceKey, i) => {
        return (
            <g className={classes.sectorWithShadow} key={sliceKey}
               transform={'rotate(' + 360 / length * i + ', 212, 212)'}>
                <g mask="url(#wedge-mask)">
                    <circle className={classes.sector} cx="212" cy="212" r="200"
                            fill={sectors[sliceKey].sphere.color}
                            style={{transform: `scale(${sectors[sliceKey].sphere.satisfaction / 10})`}}>
                    </circle>
                </g>
            </g>
        )
    });
    return (<>{slices}</>);
}

export default Sectors;