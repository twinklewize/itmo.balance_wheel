import React from 'react';
import classes from './SphereChecking.module.scss';
import {Edit3} from "react-feather";
import {Link} from "react-router-dom";
import {SphereModel} from "../../../../../domain/models/SphereModel";
import SquareCheckbox from "../../checkboxes/SquareCheckbox/SquareCheckbox";

function SphereChecking({sphere}: { sphere: SphereModel }) {
    return (
        <div className={classes.sphereCheckingContainer}>
            <div className={classes.sphereCheckingCheckboxWithTitle}>
                <SquareCheckbox/>
                <p>{sphere.name}</p>
            </div>

            <Link style={{textDecoration: "none", color: "inherit"}} to={{pathname: "/sphere/edit"}}>
                <Edit3 className={classes.editIcon}/>
            </Link>
        </div>
    );
}

export default SphereChecking;

