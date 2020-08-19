import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getMonthlyNurseWisePatientNurseCall,
} from './../../../store/actions';
import MonthlyNurseWiseCallFilter from "./monthly_nurse_wise_call_filter";
import {
    Table,
    Paginate,
    ListTitle,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../../common';


class MonthlyNurseWiseCallReport extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null };
        this.store = this.props.monthly_nurse_wise_patient_nurse_call;
    }

    async componentDidMount() {
        this.props.getMonthlyNurseWisePatientNurseCall({ columns: this.store.columns });
    }
    render() {
        const { data: monthly_report, response } = this.props.monthly_nurse_wise_patient_nurse_call;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex">
                            <ListTitle
                                title="Monthly Nurse Wise Call Summary"
                                icon="data-analytics.png"
                            />
                            <ExcelButton />
                            <PdfButton />
                            <FilterButton id="#nurseWise" />
                        </div>
                    </div>
                    <div className="card-body"
                         style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                        <MonthlyNurseWiseCallFilter />
                        {monthly_report &&
                        <Table
                            data={monthly_report}
                        />
                        }
                    </div>
                    <div className="card-footer">
                        <Paginate />
                    </div>
                </div>
                { response &&
                    <Alert data={response} id="alert"/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {...state, ...ownProps};
};

const actionCreators = {getResponse, getMonthlyNurseWisePatientNurseCall};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyNurseWiseCallReport);
