import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaWorker from './../store/saga/call_history';
import { callHistories } from './../store/reducers';
import $ from 'jquery';
import List from './call_history/list';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    callHistories,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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