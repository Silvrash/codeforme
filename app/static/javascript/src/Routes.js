import React from 'react';
import {Route, Router} from 'react-router'
import {history} from "./resources/redux/store/index";
import App from "./App";
import Editor from "./Components/pages/Editor";


export default () => (
    <Router history={history}>
        <Route exact path={'/'} component={() => <App history={history}/>}/>
        <Route path={'/code'} component={Editor}/>
    </Router>
)
