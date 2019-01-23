import {compose, createStore, applyMiddleware} from 'redux'
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from 'react-router-redux'
import rootReducer from '../reducers'

const middleware = [
  // createLogger()
]

const enhancers = compose(
  applyMiddleware(...middleware),
  // window.devToolsExtension? window.devToolsExtension() : f => false
)

const store = createStore(
  rootReducer,
  {},
  enhancers
);

const history = syncHistoryWithStore(browserHistory, store);

export {
  store,
  history
};