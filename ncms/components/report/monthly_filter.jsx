import React, {Component} from 'react';

class Monthly_filter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="collapse" id="monthly">
                <div className="card">
                    <form action="">
                        <div className="form-row justify-content-center">
                            <div className="form-group col-md-4">
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            From Month
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
                                            To Month
                                        </div>
                                    </div>
                                    <input type="text" className="form-control"
                                           aria-label="Amount (to the nearest dollar)" />
                                </div>
                            </div>
                            <div className="form-group col-md-2">
                                <button type="submit" className="btn btn-sm">
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

export default Monthly_filter;