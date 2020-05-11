import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore((type) => {return {}});
import $ from 'jquery';

import Home from './home/home';

$(function(){
   ReactDOM.render(
       <Provider store={store}>
           <Home><div className="banner" /></Home>
       </Provider>,
       document.getElementById('content')
   )
});