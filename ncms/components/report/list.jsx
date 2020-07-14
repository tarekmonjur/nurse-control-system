import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getDailyPatientNurseCall,
    getMonthlyPatientNurseCall,
} from './../../store/actions';
import Daily_filter from "./daily_filter";
import Monthly_filter from "./monthly_filter";
import {
    Table,
    Paginate,
    ListTitle,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../common';


class List extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null }
    }

    async componentDidMount() {
        this.props.getDailyPatientNurseCall({ columns: this.props.daily_patient_nurse_call.columns });
        this.props.getMonthlyPatientNurseCall({ columns: this.props.monthly_patient_nurse_call.columns });
    }

    render() {
        const { data, response } = this.props.daily_patient_nurse_call;
        const { data: data2, response: response2 } = this.props.monthly_patient_nurse_call;
        console.log('reports..');
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-6 col-sm-6">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <ListTitle
                                    title="Daily Nurse Call Summary"
                                    icon="report.png"
                                />
                                <ExcelButton />
                                <PdfButton />
                                <FilterButton id="#daily" />
                            </div>
                        </div>
                        <div className="card-body"
                             style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                            <Daily_filter />
                            {data &&
                                <Table
                                    data={data}
                                />
                            }
                        </div>
                        <div className="card-footer">
                            <Paginate />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <ListTitle
                                    title="Monthly Nurse Call Summary"
                                    icon="report-02.png"
                                />
                                <ExcelButton />
                                <PdfButton />
                                <FilterButton id="#monthly" />
                            </div>
                        </div>
                        <div className="card-body"
                             style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                            <Monthly_filter />
                            {data2 &&
                            <Table
                                data={data2}
                            />
                            }
                        </div>
                        <div className="card-footer">
                            <Paginate />
                        </div>
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

const actionCreators = {getResponse, getDailyPatientNurseCall, getMonthlyPatientNurseCall};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
