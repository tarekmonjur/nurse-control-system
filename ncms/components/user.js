import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaWorker from './../store/saga/user';
import { users } from './../store/reducers';
import $ from 'jquery';
import User from './user/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    users,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
sagaMiddleware.run(sagaWorker);

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <User><div className="banner" /></User>
       </Provider>,
       document.getElementById('content')
   )
});