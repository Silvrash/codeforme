import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/es/styles'
import {Provider} from "react-redux";
import {render} from 'react-dom'
import {store} from "./resources/redux/store";
import Routes from "./Routes";
import {theme} from "./resources/constants";

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Routes/>
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root')
)
