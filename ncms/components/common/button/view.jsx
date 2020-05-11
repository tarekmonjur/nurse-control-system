import React, {Component} from "react";

class ViewButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-fill">
                <a href="" data-toggle="tooltip" data-placement="top" title="View.">
                    <img src="../img/seo.png" alt="" />
                </a>
            </div>
        );
    }
}

export default ViewButton;