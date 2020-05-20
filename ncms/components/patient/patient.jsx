import React, {Component} from 'react';
import { connect } from 'react-redux';

import Filter from "./filter";
import AddPatient from "./add";
import {
    Table,
    Paginate,
    Modal,
    ListTitle,
    AddButton,
    FilterButton,
    PdfButton,
    ExcelButton
} from './../common';


class Patient extends Component {
    constructor(props) {
        super(props);
        this.addModalId = "add-patient-modal";
    }

    addButton = () => {
        $(`#${this.addModalId}`).modal('show');
    };
    
    render() {
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
                                    onclick={this.addButton}
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

                <Modal
                    id={this.addModalId}
                    size="modal-lg"
                    icon="bed-04.png"
                    title="Admit New Patient"
                    submitButton="Submit Admitted Form"
                    onsubmit={ () => { this.child.handleSubmit() }}>
                    <AddPatient
                        formName={this.addModalId}
                        setChild={child => this.child = child} />
                </Modal>

            </div>
        );
    }
}

export default connect(state => state)(Patient);
