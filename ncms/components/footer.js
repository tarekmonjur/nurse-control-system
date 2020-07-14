import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore((type) => {return {}});
import $ from 'jquery';

import Footer from './layout/footer';

$(function(){
    ReactDOM.render(
        <Provider store={store}>
            <Footer />
        </Provider>,
        document.getElementById('footer')
    );
});