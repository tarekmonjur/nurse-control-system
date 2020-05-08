import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore((type)=>{return {...window.locals}});
console.log('home store: ', store.getState());
import $ from "jquery";

import Home from './home/home';

$(function () {
    ReactDOM.render(
        <Provider store={store}>
            <Home />
        </Provider>,
        document.getElementById('content')
    );
});
