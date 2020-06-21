import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaWorker from './../store/saga/bed';
import { beds } from './../store/reducers';
import $ from 'jquery';
import Bed from './bed/bed';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    beds,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
sagaMiddleware.run(sagaWorker);

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <Bed><div className="banner" /></Bed>
       </Provider>,
       document.getElementById('content')
   )
});