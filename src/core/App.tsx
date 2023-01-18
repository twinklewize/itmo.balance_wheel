import React from 'react';
import AppRouter from "../UI/components/router/AppRouter";
import {Provider} from "react-redux";
import {store} from "../data/store/store";
import {BrowserRouter} from "react-router-dom";

function App() {
    return <div className="App">
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    </div>

}

export default App;