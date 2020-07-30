import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getMonthlyPatientNurseCall,
} from './../../store/actions';
import MonthlyCallFilter from "./monthly_call_filter";
import {
    Table,
    Paginate,
    ListTitle,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../common';


class MonthlyCallReport extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null }
    }

    async componentDidMount() {
        this.props.getMonthlyPatientNurseCall({ columns: this.props.monthly_patient_nurse_call.columns });
    }

    render() {
        const { data: monthly_report, response } = this.props.monthly_patient_nurse_call;
        console.log('reports..');
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex">
                            <ListTitle
                                title="Monthly Call Summary"
                                icon="report-02.png"
                            />
                            <ExcelButton />
                            <PdfButton />
                            <FilterButton id="#monthly" />
                        </div>
                    </div>
                    <div className="card-body"
                         style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                        <MonthlyCallFilter />
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

const actionCreators = {getResponse, getMonthlyPatientNurseCall};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyCallReport);
