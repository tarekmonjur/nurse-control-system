import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaWorker from './../store/saga/report';
import { dailyPatientNurseCall, monthlyPatientNurseCall } from './../store/reducers';
import $ from 'jquery';
import List from './report/list';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    combineReducers({
        daily_patient_nurse_call: dailyPatientNurseCall,
        monthly_patient_nurse_call: monthlyPatientNurseCall
    }),
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