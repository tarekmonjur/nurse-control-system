
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import HeaderLeft from '../Components/header/header-left';
import HeaderCenter from './header/header-center';
import HeaderRight from './header/header-right';

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            appName: process.env.APP_NAME
        }
    }

    render() {
        return (
            <div className='row'>
                <HeaderLeft />
                <HeaderCenter appName={ this.state.appName } />
                <HeaderRight />
            </div>
        )
    }
}

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);