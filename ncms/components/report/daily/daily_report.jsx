import React, {Component} from 'react';
import { connect } from 'react-redux';
import DailyDateWiseCallReport from "./daily_date_wise_call_report";
import DailyNurseWiseCallReport from "./daily_nurse_wise_call_report";

class DailyReport extends Component {
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
                    <DailyDateWiseCallReport />
                </div>
                <div className="col-md-6 col-sm-6">
                    <DailyNurseWiseCallReport />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {...state, ...ownProps};
};

export default connect(mapStateToProps)(DailyReport);
