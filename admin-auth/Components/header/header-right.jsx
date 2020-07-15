import React, {Component} from 'react';
import { connect } from 'react-redux';

class HeaderRight extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        console.log('header right state: ', this.state);
        const {user} = this.state;
        return (
            <div className='col-md-4'>
                <div className='user'>
                    <div>
                        <img src="" alt=""/>
                    </div>
                    <div className="text-white">
                        <a href="/">{user && user.fname}</a>
                    </div>
                </div>
                <div className='auth-link'>
                    <a href="/logout" className="pr-3">Logout</a>
                </div>
            </div>
        );
    }
}

export default connect((state, ownPro) => { return {...ownPro, ...state}; })(HeaderRight);