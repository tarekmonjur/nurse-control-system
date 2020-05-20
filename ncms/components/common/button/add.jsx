import React, {Component} from "react";

class AddButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <a href="#" onClick={this.props.onclick}>
                    <img src="../img/plus.png" alt="" /> {this.props.title}</a>
            </div>
        );
    }
}

export default AddButton;