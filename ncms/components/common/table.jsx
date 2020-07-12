import React, {Component} from "react";
import EditButton from './button/edit';
import ViewButton from './button/view';
import DeleteButton from './button/delete';
import {isObject, get} from 'lodash';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    tableBody(data) {
        let columns = data.metadata.columns;
        let results = data.results;
        const onView = this.props.onView;
        const onEdit = this.props.onEdit;
        const onDelete = this.props.onDelete;
        columns = columns.split(',');

        return results.map((data, index) => {
            index++;
            return <TableBodyTr
                key={index}
                tr={index}
                columns={columns}
                data={data}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        })
    };

    render() {
        const {data, onView, onEdit, onDelete} = this.props;
        return (
            <div className="table-responsive">
                <table className="table table-sm table-bordered table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th>SL No</th>
                        { data.columns &&
                            Object.entries(data.columns).map((column) => (<th key={column[0]}>{column[1]}</th>))
                        }
                        { (onView || onEdit || onDelete) &&
                            <th>Options</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                        {data.results && this.tableBody(data) }
                    </tbody>
                </table>
            </div>
        );
    }
}


function TableBodyTd(props) {
    const value = get(props.data, props.column);
    return <td>{value}</td>
}

const TableBodyTr = (props) => {
    return (<tr>
        <td>{props.tr}</td>
        { props.columns.map((column,td) => (
            <TableBodyTd key={`${props.tr}${td}`}
                         data={props.data}
                         column={column} />
        ))}
        <td>
            { (props.onEdit || props.onEdit || props.onDelete) &&
                <div className="d-flex actions">
                    {props.onEdit &&
                    <EditButton
                        rowId={props.data._id}
                        action={props.onEdit}
                    />
                    }
                    {props.onView &&
                    <ViewButton
                        rowId={props.data._id}
                        action={props.onView}
                    />
                    }
                    {props.onDelete &&
                    <DeleteButton
                        rowId={props.data._id}
                        action={props.onDelete}
                    />
                    }
                </div>
            }
        </td>
    </tr>)
};

export default Table;