import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaWorker from './../store/saga/nurse';
import { nurses } from './../store/reducers';
import $ from 'jquery';
import Nurse from './nurse/nurse';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    nurses,
    compose(
        applyMiddleware(sagaMiddleware),
        composeEnhancers
    )
);
sagaMiddleware.run(sagaWorker);

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <Nurse><div className="banner" /></Nurse>
       </Provider>,
       document.getElementById('content')
   )
});