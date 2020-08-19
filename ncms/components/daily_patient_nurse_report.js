import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { sagaDailyReportWorker } from './../store/saga/report';
import { dailyDateWisePatientNurseCall, dailyNurseWisePatientNurseCall } from './../store/reducers';
import $ from 'jquery';
import { DailyReport } from './report';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    combineReducers({
        daily_date_wise_patient_nurse_call: dailyDateWisePatientNurseCall,
        daily_nurse_wise_patient_nurse_call: dailyNurseWisePatientNurseCall
    }),
    compose(
        applyMiddleware(sagaMiddleware),
        composeEnhancers
    )
);
sagaMiddleware.run(sagaDailyReportWorker);

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <DailyReport><div className="banner" /></DailyReport>
       </Provider>,
       document.getElementById('content')
   )
});