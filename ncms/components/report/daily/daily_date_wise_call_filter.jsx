import React, {Component} from 'react';
import DatePicker from "react-datepicker";

class DailyDateWiseCallFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    handleChange(event) {

    }

    render() {
        return (
            <div className="collapse" id="dateWise">
                <div className="card">
                    <form action="">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text" style={{padding: '0rem 0.4rem'}}>
                                            From Date
                                        </div>
                                    </div>
                                    <DatePicker
                                        id="form_date"
                                        name="form_date"
                                        className="form-control form-control-sm filter-date"
                                        onChange={this.handleChange}
                                        selected={this.state.date}
                                        placeholder="Form Date..."/>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            To Date
                                        </div>
                                    </div>
                                    <DatePicker
                                        id="to_date"
                                        name="to_date"
                                        className="form-control form-control-sm filter-date"
                                        onChange={this.handleChange}
                                        selected={this.state.date}
                                        placeholder="To date..."/>
                                </div>
                            </div>
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

export default DailyDateWiseCallFilter;