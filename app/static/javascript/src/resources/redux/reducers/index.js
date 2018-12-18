import {combineReducers} from "redux";
import {routerReducer} from 'react-router-redux'
import {SETTINGS_CHANGE} from "../types/settings";

const initialState = {
    theme: 'light',
    tabSize: 4,
    fontSize: 20,
    lazyMode: false,
    lineNumbers: true,
    splits: 1,
    language: 'python',
    orientation: 'beside',
    rows: [1]
}

const settings = (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_CHANGE:
            return {...state, ...action.payload}
        default:
            return state
    }
};

export default combineReducers({
    settings: settings,
    routing: routerReducer
});
//npm i --save-dev babel-plugin-transform-object-rest-spread