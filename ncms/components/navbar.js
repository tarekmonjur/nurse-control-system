import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore((type) => {return {...window.locals}});
import $ from 'jquery';

import Navbar from './layout/navbar';

$(function(){
    if (store.getState().user) {
        ReactDOM.render(
            <Provider store={store}>
                <Navbar/>
            </Provider>,
            document.getElementById('menu')
        );
    }
});