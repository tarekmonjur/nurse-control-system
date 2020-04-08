import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Hello React...</h1>
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
