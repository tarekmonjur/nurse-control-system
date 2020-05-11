import React, {Component} from "react";

class AddButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <a href="#" data-toggle="modal" data-target="#exampleModal">
                    <img src="../img/plus.png" alt="" /> Admit Patient</a>
            </div>
        );
    }
}

export default AddButton;