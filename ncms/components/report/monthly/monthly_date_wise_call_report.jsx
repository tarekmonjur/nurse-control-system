import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getMonthlyDateWisePatientNurseCall,
} from './../../../store/actions';
import MonthlyDateWiseCallFilter from "./monthly_date_wise_call_filter";
import {
    Table,
    Paginate,
    ListTitle,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../../common';


class MonthlyDateWiseCallReport extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null };
        this.store = this.props.monthly_date_wise_patient_nurse_call;
    }

    async componentDidMount() {
        this.props.getMonthlyDateWisePatientNurseCall({ columns: this.store.columns });
    }

    render() {
        const { data: monthly_report, response } = this.props.monthly_date_wise_patient_nurse_call;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex">
                            <ListTitle
                                title="Monthly Date Wise Call Summary"
                                icon="report-02.png"
                            />
                            <ExcelButton />
                            <PdfButton />
                            <FilterButton id="#dateWise" />
                        </div>
                    </div>
                    <div className="card-body"
                         style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                        <MonthlyDateWiseCallFilter />
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

const actionCreators = {getResponse, getMonthlyDateWisePatientNurseCall};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyDateWiseCallReport);
