import React, {Component} from "react";

class EditButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-fill">
                <a href="" data-toggle="tooltip" data-placement="top" title="Edit.">
                    <img src="../img/pencil.png" alt="" />
                </a>
            </div>
        );
    }
}

export default EditButton;