
import React, {Component} from 'react';
import { connect } from 'react-redux';

import HeaderLeft from './header-left';
import HeaderCenter from './header-center';
import HeaderRight from './header-right';

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            appName: process.env.APP_NAME,
        }
    }

    render() {
        console.log('header state: ', this.state);
        return (
            <div className='row'>
                <HeaderLeft />
                <HeaderCenter appName={ this.state.appName } />
                <HeaderRight user={this.state.user}/>
            </div>
        )
    }
}

export default connect((state) => {return {...state, ...window.locals}})(Header);
