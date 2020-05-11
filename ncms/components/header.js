import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore((type) => {return {...window.locals}});
import $ from 'jquery';

import Header from './layout/header';

$(function(){
    ReactDOM.render(
        <Provider store={store}>
            <Header />
        </Provider>,
        document.getElementById('header')
    );
});