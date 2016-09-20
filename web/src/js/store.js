import * as redux from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

var buildFactoryWithMiddleware = redux.applyMiddleware(
    thunkMiddleware,
    createLogger()
)(redux.createStore);

var store = buildFactoryWithMiddleware(reducers);

export default store;
