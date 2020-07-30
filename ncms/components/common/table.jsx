import React, {Component} from "react";
import EditButton from './button/edit';
import ViewButton from './button/view';
import DeleteButton from './button/delete';
import {isArray, get} from 'lodash';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidMount() {
    //     setInterval(() => (this.setState({date: new Date()})), 1000);
    // }

    tableBody(data, table_name=null) {
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
                table_name={table_name}
            />
        })
    };

    render() {
        const {data, onView, onEdit, onDelete, table_name} = this.props;
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
                        {data.results && this.tableBody(data, table_name) }
                    </tbody>
                </table>
            </div>
        );
    }
}


function TableBodyTd(props) {
    let value;
    const array_column = props.column.split('[*].');

    if (array_column.length > 0 &&
        isArray(get(props.data, array_column[0]))) {
        value = get(props.data, array_column[0])
            .reduce((result, value) => [...result, value[array_column[1]]], [])
            .join(', ');
    } else {
        value = get(props.data, props.column);
    }

    return <td>{value}</td>
}

function TrCallBgColor(data) {
    let text_color = '';
    let bg_color = '';

    if (data && data.call) {
        text_color = 'text-dark';
        bg_color = 'bg-warning';
    }

    if (data && data.receive) {
        text_color = 'text-white';
        bg_color = 'bg-info';
    }

    if (data && data.present) {
        text_color = 'text-white';
        bg_color = 'bg-teal';
    }

    if (data && data.emergency) {
        text_color = 'text-white';
        bg_color = 'bg-danger';
    }

    if (data && data.complete) {
        text_color = 'text-white';
        bg_color = 'bg-success';
    }
    return {text_color, bg_color};
}

const TableBodyTr = (props) => {
    let tr_color, tr_bg, tr_text_bold;
    if (props.table_name === 'real_time_call') {
        const {text_color, bg_color} = TrCallBgColor(props.data);
        tr_color = text_color;
        tr_bg = bg_color;
        tr_text_bold = 'font-weight-bold';
    }


    return (<tr className={`${tr_text_bold} ${tr_color} ${tr_bg}`}>
        <td>{props.tr}</td>
        { props.columns.map((column,td) => (
            <TableBodyTd key={`${props.tr}${td}`}
                         data={props.data}
                         column={column} />
        ))}
        { (props.onEdit || props.onEdit || props.onDelete) &&
        <td style={{width: '120px'}}>
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
        </td>
        }
    </tr>)
};

export default Table;