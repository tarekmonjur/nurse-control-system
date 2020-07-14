import React, {Component} from "react";
import { confirmAlert } from 'react-confirm-alert';

class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.deleteAction = this.deleteAction.bind(this);
    }

    deleteAction(event) {
        event.preventDefault();
        const options = {
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'No',
                    className: 'no',
                    onClick: () => {

                    }
                },
                {
                    label: 'Yes, Delete it!',
                    className: 'yes',
                    onClick: () => {
                        this.props.action(this.props.rowId);
                    }
                },
            ],
            closeOnClickOutside: false,
        };
        confirmAlert(options);
    }

    render() {
        return (
            <div className="flex-fill">
                <a href=""
                    onClick={this.deleteAction}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete.">
                    <img src="../img/trash.png" alt="" />
                </a>
            </div>
        );
    }
}

export default DeleteButton;