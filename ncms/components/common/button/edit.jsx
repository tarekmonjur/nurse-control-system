import React, {Component} from "react";

class EditButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: "edit-patient-modal",
        };
        this.editAction = this.editAction.bind(this);
    }

    async editAction(event) {
        event.preventDefault();
        await this.props.action(this.props.rowId);
    }

    render() {
        return (
            <div className="flex-fill">
                <a href=""
                   onClick={this.editAction}
                   data-toggle="tooltip"
                   data-placement="top"
                   title="Edit.">
                    <img src="../img/pencil.png" alt="" />
                </a>
            </div>
        );
    }
}

export default EditButton;