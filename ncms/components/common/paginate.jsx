import React, {Component} from "react";

class Paginate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex">
                <div className="flex-fill">show 50 record from 100</div>
                <div className="flex-fill">
                    <nav aria-label="Page navigation">
                        <ul className="pagination pagination-sm justify-content-end">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1"
                                   aria-disabled="true">Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Paginate;