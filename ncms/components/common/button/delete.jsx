import React, {Component} from "react";

class DeleteButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-fill">
                <a href="" data-toggle="tooltip" data-placement="top"
                   title="Delete.">
                    <img src="../img/trash.png" alt="" />
                </a>
            </div>
        );
    }
}

export default DeleteButton;