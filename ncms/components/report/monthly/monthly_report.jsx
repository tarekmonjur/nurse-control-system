import React, {Component} from 'react';
import { connect } from 'react-redux';
import MonthlyDateWiseCallReport from "./monthly_date_wise_call_report";
import MonthlyNurseWiseCallReport from "./monthly_nurse_wise_call_report";

class MonthlyReport extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null }
    }

    render() {
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-6 col-sm-6">
                    <MonthlyDateWiseCallReport />
                </div>
                <div className="col-md-6 col-sm-6">
                    <MonthlyNurseWiseCallReport />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {...state, ...ownProps};
};

export default connect(mapStateToProps)(MonthlyReport);
