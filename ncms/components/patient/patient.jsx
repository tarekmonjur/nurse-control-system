import React, {Component} from 'react';
import { connect } from 'react-redux';

import Filter from "./filter";
import {
    Table,
    Paginate,
    AddButton,
    FilterButton,
    PdfButton,
    ExcelButton
} from './../common';


class Patient extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <img src="../img/patient-03.png" alt="" />
                                        Patients List
                                </div>
                                <ExcelButton />
                                <PdfButton />
                                <FilterButton />
                                <AddButton />
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
            </div>
        );
    }
}

export default connect(state => state)(Patient);

