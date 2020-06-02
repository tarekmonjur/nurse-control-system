import React, {Component} from "react";

import EditButton from './button/edit';
import ViewButton from './button/view';
import DeleteButton from './button/delete';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    tableBody(columns, results) {
        columns = columns.split(',');
        return results.map((data, index) => {
            index++;
            return <TableBodyTr key={index} tr={index} columns={columns} data={data} />
        })
    };

    render() {
        const {data} = this.props;
        console.log('table', data);
        return (
            <div className="table-responsive">
                <table className="table table-sm table-bordered table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th>SL No</th>
                        { data.columns &&
                            Object.entries(data.columns).map((column) => (<th key={column[0]}>{column[1]}</th>))
                        }
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.results && this.tableBody(data.metadata.columns, data.results) }
                    </tbody>
                </table>
            </div>
        );
    }
}


function TableBodyTd(props) {
    return <td>{props.value}</td>
}

const TableBodyTr = (props) => {
    return (<tr>
        <td>{props.tr}</td>
        { props.columns.map((column,td) => (
            <TableBodyTd key={`${props.tr}${td}`} value={props.data[column]} />
        ))}
        <td>
            <div className="d-flex actions">
                <EditButton />
                <ViewButton />
                <DeleteButton />
            </div>
        </td>
    </tr>)
};

export default Table;