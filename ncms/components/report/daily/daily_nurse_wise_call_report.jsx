import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getDailyNurseWisePatientNurseCall,
} from './../../../store/actions';
import DailyNurseWiseCallFilter from "./daily_nurse_wise_call_filter";
import {
    Table,
    Paginate,
    ListTitle,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../../common';


class DailyNurseWiseCallReport extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null };
        this.storeDate = this.props.daily_nurse_wise_patient_nurse_call;
    }

    async componentDidMount() {
        this.props.getDailyNurseWisePatientNurseCall({ columns: this.storeDate.columns });
    }

    render() {
        const { data: daily_report, response } = this.props.daily_nurse_wise_patient_nurse_call;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex">
                            <ListTitle
                                title="Daily Nurse Wise Call Summary"
                                icon="analysis.png"
                            />
                            <ExcelButton />
                            <PdfButton />
                            <FilterButton id="#nurseWise" />
                        </div>
                    </div>
                    <div className="card-body"
                         style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                        <DailyNurseWiseCallFilter />
                        {daily_report &&
                            <Table
                                data={daily_report}
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

const actionCreators = {getResponse, getDailyNurseWisePatientNurseCall};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyNurseWiseCallReport);
