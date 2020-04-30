import React, {Component} from 'react';


class HeaderCenter extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='col-md-4'>
                <h2 className='text-white'>{this.props.appName}</h2>
            </div>
        );
    }
}

export default HeaderCenter;