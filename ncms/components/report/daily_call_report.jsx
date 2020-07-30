import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getDailyPatientNurseCall,
} from './../../store/actions';
import DailyCallFilter from "./daily_call_filter";
import {
    Table,
    Paginate,
    ListTitle,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../common';


class DailyCallReport extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null }
    }

    async componentDidMount() {
        this.props.getDailyPatientNurseCall({ columns: this.props.daily_patient_nurse_call.columns });
    }

    render() {
        const { data: daily_report, response } = this.props.daily_patient_nurse_call;
        console.log('reports..');
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex">
                            <ListTitle
                                title="Daily Call Summary"
                                icon="report.png"
                            />
                            <ExcelButton />
                            <PdfButton />
                            <FilterButton id="#daily" />
                        </div>
                    </div>
                    <div className="card-body"
                         style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                        <DailyCallFilter />
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

const actionCreators = {getResponse, getDailyPatientNurseCall};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyCallReport);
