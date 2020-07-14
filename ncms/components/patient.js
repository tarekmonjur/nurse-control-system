import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { patients} from './../store/reducers';
const store = createStore(patients, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import $ from 'jquery';
import Patient from './patient/patient';

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <Patient><div className="banner" /></Patient>
       </Provider>,
       document.getElementById('content')
   )
});