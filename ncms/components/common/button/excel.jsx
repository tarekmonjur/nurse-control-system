import React, {Component} from "react";

class ExcelButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pr-3">
                <a className="" href="#">
                    <img src="../img/spreadsheet.png" alt="" />
                    Export Excel
                </a>
            </div>
        );
    }
}

export default ExcelButton;