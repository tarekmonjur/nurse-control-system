import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore((type) => {return {...window.locals}});
import $ from 'jquery';

import Login from './auth/login';

$(function(){
    ReactDOM.render(
        <Provider store={store}>
            <Login />
        </Provider>,
        document.getElementById('content')
    )
});