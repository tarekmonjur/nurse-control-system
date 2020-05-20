import React, {Component} from "react";
import ReactLoading from 'react-loading';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactLoading type="bars" color="#ffffff" height={this.props.height} width={this.props.width} />
        );
    }
}

export default Loading;