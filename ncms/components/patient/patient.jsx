import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {getPatients, loader} from './../../store/actions';

import Filter from "./filter";
import AddModal from "../patient/addModal";
import {
    Table,
    Paginate,
    ListTitle,
    AddButton,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../common';
import patientApi from "../../store/patient";



class Patient extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = {
            ...props
        };
    }

    async componentDidMount() {
        // console.log('patients componentDidMount');
        // fetch(`${process.env.HOST}:${process.env.PORT}/api/patients`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(result => {
        //         this.setState({
        //             data: result.results,
        //         });
        //     });
        await patientApi.getPatientsApi().then(result => {
            this.props.getPatients(result);
        });
    }

    render() {
        const {response, data} = this.props;
        console.log('patients data', data);
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <ListTitle
                                    title="Patients List"
                                    icon="patient-03.png"
                                />
                                <ExcelButton />
                                <PdfButton />
                                <FilterButton />
                                <AddButton
                                    title="Admit Patient"
                                    onclick={() => {
                                        this.child.open()
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <Filter />
                            {data &&
                                <Table data={data}/>
                            }
                        </div>
                        <div className="card-footer">
                            <Paginate />
                        </div>
                    </div>
                </div>
                <AddModal setChild={(child) => this.child = child}/>
                { response &&
                    <Alert data={response}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {...state, ...ownProps};
};

const actionCreators = {loader, getPatients};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
