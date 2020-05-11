import React, {Component} from "react";

class PdfButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pr-3">
                <a className="" href="#">
                    <img src="../img/pdf.png" alt="" />
                    Print PDF
                </a>
            </div>
        );
    }
}

export default PdfButton;