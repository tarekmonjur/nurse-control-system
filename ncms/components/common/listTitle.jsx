import React, {Component} from "react";


class ListTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-grow-1">
                <img src={`../img/${this.props.icon}`} alt="" />
                &nbsp;{this.props.title}
            </div>
        );
    }
}

export default ListTitle;