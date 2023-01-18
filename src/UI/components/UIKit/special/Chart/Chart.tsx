import {SphereModel} from "../../../../../domain/models/SphereModel";
import classes from "./Chart.module.scss";
import Sectors from "./Sectors";
import React from "react";

export default function Chart({spheres}: {
    spheres: { [_: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } };
}) {
    let opts = {
        cx: 200,
        cy: 200,
        radius: 200,
        start_angle: 0,
        end_angle: 360 / (Object.keys(spheres).length < 2 ? 2 : Object.keys(spheres).length),
    };

    let start = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.end_angle);
    let end = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle);
    let largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

    let d = [
        "M", start.x, start.y,
        "A", opts.radius, opts.radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", opts.cx, opts.cy,
        "Z"
    ].join(" ");

    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    return (
        <div className={classes.chartBloc}>
            <svg className={classes.chartPieChunk} viewBox="0 0 424 424" xmlns="http://www.w3.org/2000/svg">
                <mask id="wedge-mask" fill="white">
                    <path transform="translate(12, 12)" d={d} fillRule="nonzero"></path>
                </mask>
                <circle cx="212" cy="212" r="200" fill="#EFEFEF"></circle>
                <circle cx="212" cy="212" r="195" fill="#FFFFFF"></circle>
                <circle cx="212" cy="212" r="180" fill="#EFEFEF"></circle>
                <circle cx="212" cy="212" r="140" fill="#FFFFFF"></circle>
                <circle cx="212" cy="212" r="100" fill="#EFEFEF"></circle>
                <Sectors sectors={spheres}/>
            </svg>
        </div>
    )
}
