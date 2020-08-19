import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { sagaMonthlyReportWorker } from './../store/saga/report';
import { monthlyDateWisePatientNurseCall, monthlyNurseWisePatientNurseCall } from './../store/reducers';
import $ from 'jquery';
import { MonthlyReport } from './report';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
    combineReducers({
        monthly_date_wise_patient_nurse_call: monthlyDateWisePatientNurseCall,
        monthly_nurse_wise_patient_nurse_call: monthlyNurseWisePatientNurseCall
    }),
    compose(
        applyMiddleware(sagaMiddleware),
        composeEnhancers
    )
);
sagaMiddleware.run(sagaMonthlyReportWorker);

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <MonthlyReport><div className="banner" /></MonthlyReport>
       </Provider>,
       document.getElementById('content')
   )
});