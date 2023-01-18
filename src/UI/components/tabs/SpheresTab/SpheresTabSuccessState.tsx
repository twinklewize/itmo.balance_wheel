import React from 'react';
import {SphereModel} from "../../../../domain/models/SphereModel";
import AppBar from "../../navigation/AppBar/AppBar";
import SettingsPopupMenu from "../../popups/SettingsPopupMenu";
import Content from "../../UIKit/containers/Content/Content";
import ChartWithContainers from "../../UIKit/special/Chart/ChartWithContainers";
import {Link} from "react-router-dom";
import AddButton from "../../UIKit/buttons/AddButton/AddButton";

function SpheresTabSuccessState({spheresMap, selectScore}: {
    spheresMap: { [key: string]: { sphere: SphereModel, completedTasksCount: number, allTasksCount: number } }
    selectScore: (question: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

    return (
        <>
            <AppBar title={(<h3>Колесо баланса</h3>)} rightIcon={(<SettingsPopupMenu/>)}/>
            <Content marginBottom={72}>
                <ChartWithContainers defaultSpheres={spheresMap} selectScore={selectScore}/>
            </Content>
            <Link to={"/sphere/create"}><AddButton/></Link>
        </>
    );
}

export default SpheresTabSuccessState;

