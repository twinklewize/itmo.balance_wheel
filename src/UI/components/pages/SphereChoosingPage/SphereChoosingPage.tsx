import React from 'react';
import {Link} from "react-router-dom";
import AppBar, {AppBarType} from "../../navigation/AppBar/AppBar";
import Content from "../../UIKit/containers/Content/Content";
import classes from "../WelcomePage/WelcomePage.module.scss";
import Chart from "../../UIKit/special/Chart/Chart";
import SphereChecking from "../../UIKit/tasks/SphereChecking/SphereChecking";
import {SphereModel} from "../../../../domain/models/SphereModel";
import Button from "../../UIKit/buttons/Button/Button";
import {availableColors} from "../../../../core/constants/constants";

;

const defaultSpheres: { [key: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } } = {
    1: {
        sphere: {
            id: '1',
            icon: 'heart',
            name: 'Здоровье',
            color: availableColors[0],
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    2: {
        sphere: {
            id: '2',
            icon: 'book',
            name: availableColors[1],
            color: '#ECAF77',
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    3: {
        sphere: {
            id: '3',
            icon: 'tv',
            name: 'Семья',
            color: availableColors[2],
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    4: {
        sphere: {
            id: '4',
            icon: 'github',
            name: 'Семья',
            color: availableColors[3],
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    5: {
        sphere: {
            id: '5',
            icon: 'briefcase',
            name: 'Работа',
            color: availableColors[6],
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    6: {
        sphere: {
            id: '6',
            icon: 'archive',
            name: 'Деньги',
            color: availableColors[7],
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    7: {
        sphere: {
            id: '7',
            icon: 'camera',
            name: 'Хобби',
            color:  availableColors[8],
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    8: {
        sphere: {
            id: '8',
            icon: 'users',
            name: 'Друзья',
            color: availableColors[9],
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    }
};

function SphereChoosingPage() {
    return (
        <div>
            <AppBar type={AppBarType.transparent} leftIcon={(
                <img style={{height: 28, width: 28}} className={classes.logo} src={'/images/logo.svg'}></img>)}/>
            <Content>
                <h1>Привет дорогой друг!</h1>
                <p style={{padding: 0, margin: 0,}}>Выбери из каких сфер состоит твоя жизнь</p>
                <Chart spheres={defaultSpheres}/>
                {Object.keys(defaultSpheres).map((sphereKey) => (
                    <SphereChecking key={sphereKey} sphere={defaultSpheres[sphereKey].sphere}/>
                ))}
                <Link to={"/sphere/grade"} style={{textDecoration: "none", color: "inherit", width: "100%"}}>
                    <Button buttonText='Продолжить'/>
                </Link>
            </Content>

        </div>
    );
};

export default SphereChoosingPage;