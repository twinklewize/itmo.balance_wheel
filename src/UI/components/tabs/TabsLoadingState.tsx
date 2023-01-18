import React from 'react';
import AppBar, {AppBarType} from "../navigation/AppBar/AppBar";
import Content from "../UIKit/containers/Content/Content";
import LoadingIndicator from "../UIKit/special/LoadingIndicator/LoadingIndicator";

function TabsLoadingState({text = 'Идет загрузка...'}:{text?: string}) {
    return (
        <>
            <AppBar title={(<h3>{text}</h3>)} type={AppBarType.transparent}/>
            <Content>
                <LoadingIndicator/>
            </Content>
        </>
    )
}

export default TabsLoadingState;

