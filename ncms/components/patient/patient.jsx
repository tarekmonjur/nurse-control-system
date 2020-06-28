import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {getPatients, loader, getResponse} from './../../store/actions';
import api from "../../store/api";

import Filter from "./filter";
import AddModal from "./addModal";
import EditModal from "./editModal";
import ViewModal from "./viewModal";
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
        this.user = props.user;
        this.onDelete = this.onDelete.bind(this);
        this.state = { response: null }
    }

    async componentDidMount() {
        this.props.getPatients(
            await api.getPatients({ columns: this.props.columns })
        );
    }

    onDelete(id) {
        this.setState({ response: null });
        api.deletePatient(id)
            .then(result => {
                this.setState({ response: result });
                api.getPatients({ columns: this.props.columns })
                    .then(result => {
                        this.props.getPatients(result);
                    });
            });
    }

    render() {
        const { data } = this.props;
        const { response } = this.state;
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
                                        this.addModal.open()
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-body"
                             style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                            <Filter />
                            {data &&
                                <Table
                                    data={data}
                                    onEdit={this.editModal.open}
                                    onView={this.viewModal.onView}
                                    onDelete={this.onDelete}
                                />
                            }
                        </div>
                        <div className="card-footer">
                            <Paginate />
                        </div>
                    </div>
                </div>
                <AddModal setChild={(child) => this.addModal = child} />
                <EditModal setChild={(child) => this.editModal = child} />
                <ViewModal setChild={(child) => this.viewModal = child}/>
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

const actionCreators = {loader, getPatients, getResponse};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
