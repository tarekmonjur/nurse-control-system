import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore((type) => {return {...window.locals}});
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