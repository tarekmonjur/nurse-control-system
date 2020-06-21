import React, {Component} from "react";
import {Modal} from "../index";

class ViewButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: "view-patient-modal",
        };
        this.viewAction = this.viewAction.bind(this);
    }

    async viewAction(event) {
        event.preventDefault();
        await this.props.action(this.props.rowId);
    }

    render() {
        return (
            <div className="flex-fill">
                <a href=""
                    onClick={this.viewAction}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="View.">
                    <img src="../img/seo.png" alt="" />
                </a>
            </div>
        );
    }
}

export default ViewButton;