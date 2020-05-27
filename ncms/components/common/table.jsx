import React, {Component} from "react";

import EditButton from './button/edit';
import ViewButton from './button/view';
import DeleteButton from './button/delete';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('table');
        return (
            <div className="table-responsive">
                <table className="table table-sm table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>SL No</th>
                        <th>Patient Name</th>
                        <th>Bed No</th>
                        <th>Admitted</th>
                        <th>Guardian</th>
                        <th>Mobile No</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Release</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>Name...</td>
                        <td>
                            <div className="d-flex actions">
                                <EditButton />
                                <ViewButton />
                                <DeleteButton />
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;