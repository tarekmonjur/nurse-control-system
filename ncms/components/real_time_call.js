import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaWorker from './../store/saga/real_time_call';
import { realTimeCall } from './../store/reducers';
import $ from 'jquery';
import List from './real_time_call/list';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    realTimeCall,
    compose(
        applyMiddleware(sagaMiddleware),
        composeEnhancers
    )
);
sagaMiddleware.run(sagaWorker);

$(function(){
    ReactDOM.render(
        <Provider store={store}>
            <List><div className="banner" /></List>
        </Provider>,
        document.getElementById('content')
    )
});