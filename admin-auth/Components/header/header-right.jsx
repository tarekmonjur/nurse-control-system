import React, {Component} from 'react';


class HeaderRight extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='col-md-4'>
                <div className='user'>
                    <div>
                        <img src="" alt=""/>
                    </div>
                    <div>
                        <span>Tarek</span>
                        <a href="/logout">Logout</a>
                    </div>
                </div>
                <div className='auth-link'>
                    <a href="/login">Login</a>
                    <a href="/signup">Register</a>
                </div>
            </div>
        );
    }
}

export default HeaderRight;