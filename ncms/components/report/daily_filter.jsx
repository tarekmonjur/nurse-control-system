import React, {Component} from 'react';

class Daily_filter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="collapse" id="daily">
                <div className="card">
                    <form action="">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            Nurse :
                                        </div>
                                    </div>
                                    <select className="form-control form-control-sm">
                                        <option selected>Choose Search Field...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            From Date
                                        </div>
                                    </div>
                                    <input type="text" className="form-control"
                                           aria-label="Amount (to the nearest dollar)" />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            To Date
                                        </div>
                                    </div>
                                    <input type="text" className="form-control"
                                           aria-label="Amount (to the nearest dollar)" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row justify-content-end">
                            <div className="form-group col-md-2 justify-content-end">
                                <button type="submit" className="btn btn-sm float-right">
                                    <img src="../img/search.png" alt="" />
                                        Filters
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Daily_filter;