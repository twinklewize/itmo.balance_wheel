import React from 'react';
import {Link} from "react-router-dom";
import AppBar from "../../navigation/AppBar/AppBar";
import Content from "../../UIKit/containers/Content/Content";
import ChartWithContainers from "../../UIKit/special/Chart/ChartWithContainers";
import BackArrow from "../../UIKit/buttons/BackArrow/BackArrow";
import Button from "../../UIKit/buttons/Button/Button";
import {SphereModel} from "../../../../domain/models/SphereModel";


const defaultSpheres: { [key: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } } = {
    1: {
        sphere: {
            id: '1',
            icon: 'heart',
            name: 'Здоровье',
            color: '#EC8C77',
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    },
    2: {
        sphere: {
            id: '2',
            icon: 'book',
            name: 'Саморазвитие',
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
            color: '#ECEB77',
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
            color: '#77EC7C',
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
            color: '#75EACE',
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
            color: '#75EAE3',
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
            color: '#75B9EA',
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
            color: '#7596EA',
            satisfaction: 7,
        },
        allTasksCount: 0,
        completedTasksCount: 0
    }
};

const SphereGradingPage: React.FC = (): JSX.Element => {
    return (
        <div>
            <AppBar leftIcon={<BackArrow/>} title={<h3>Оценка сфер</h3>}/>
            <Content>
                <ChartWithContainers defaultSpheres={defaultSpheres} withProgressBar={false}/>
                <Link to={"/spheres"} style={{textDecoration: "none", color: "inherit", width: "100%"}}>
                    <Button buttonText='Продолжить'/>
                </Link>
            </Content>

        </div>
    );
};

export default SphereGradingPage;