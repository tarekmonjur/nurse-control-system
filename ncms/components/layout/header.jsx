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
        return (
            <div className="row">
                <HeaderLeft />
                <HeaderCenter />
                <HeaderRight />
            </div>
        )
    }
}

export default connect(state => state)(Header);
