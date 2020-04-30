import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

class Home extends React.Component {

    render() {
        return (
            <div className='row'>
                <div className="col-md-12">
                    <h1 className='text-dark'>Hello React...</h1>
                </div>
            </div>
        );
    }
}


$(function () {
    ReactDOM.render(
        <Home />,
        document.getElementById('content')
    );
});
