import React, {Component} from "react";
import ReactLoading from 'react-loading';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {col} = this.props;
        return (
            <div className={col || 'col-6'} style={{margin: "0px auto"}}>
                <ReactLoading
                    type="bars"
                    style={{margin: "0px auto", fill: "rgb(255, 255, 255)"}} />
            </div>

        );
    }
}

export default Loading;