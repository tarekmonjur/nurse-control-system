import React, {Component} from 'react';
import DatePicker from "react-datepicker";

class MonthlyNurseWiseCallFilter extends Component {
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
            <div className="collapse" id="nurseWise">
                <div className="card">
                    <form action="">
                        <div className="form-row justify-content-center">
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
                                        id="form_date"
                                        name="form_date"
                                        className="form-control form-control-sm filter-date"
                                        onChange={this.handleChange}
                                        selected={this.state.date}
                                        placeholder="Form Date..."/>
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

export default MonthlyNurseWiseCallFilter;