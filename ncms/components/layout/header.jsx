import React, {Component} from 'react';
import { connect } from 'react-redux';

import HeaderLeft from './headerLeft';
import HeaderCenter from './headerCenter';
import HeaderRight from './headerRight';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        const {user} = this.state;
        return (
            <div className="row">
                <HeaderLeft />
                { user && <HeaderCenter /> }
                { user && <HeaderRight /> }
            </div>
        )
    }
}

export default connect(state => state)(Header);
