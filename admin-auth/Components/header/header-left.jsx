import React, {Component} from 'react';


class HeaderLeft extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='col-md-4'>
                <img src='img/health.png' width='80' />
            </div>
        );
    }
}

export default HeaderLeft;