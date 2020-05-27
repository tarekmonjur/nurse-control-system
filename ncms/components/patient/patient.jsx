import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {loader} from './../../store/actions';

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



class Patient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addModal: false
        };
    }

    componentDidMount() {
        console.log('patients');
    }

    render() {
        const {response} = this.props.data;
        const {actions} = this.props.data.patient;
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
                            <Table />
                        </div>
                        <div className="card-footer">
                            <Paginate />
                        </div>
                    </div>
                </div>
                <AddModal setChild={(child) => this.child = child}/>
                { response &&
                    <Alert />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {...state, ...ownProps};
};

const actionCreators = {loader};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
