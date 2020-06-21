import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaWorker from './../store/saga/doctor';
import { doctors } from './../store/reducers';
import $ from 'jquery';
import Doctor from './doctor/doctor';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    doctors,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
sagaMiddleware.run(sagaWorker);

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <Doctor><div className="banner" /></Doctor>
       </Provider>,
       document.getElementById('content')
   )
});