import React, {Component} from 'react';
import { connect } from 'react-redux';
import DailyCallReport from "./daily_call_report";
import MonthlyCallReport from "./monthly_call_report";

class Report extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null }
    }

    render() {
        console.log('reports..');
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-6 col-sm-6">
                    <DailyCallReport />
                </div>
                <div className="col-md-6 col-sm-6">
                    <MonthlyCallReport />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {...state, ...ownProps};
};

export default connect(mapStateToProps)(Report);
