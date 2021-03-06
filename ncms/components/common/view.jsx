import React, {Component} from "react";
import {isArray, isObject, unset} from 'lodash';

class View extends Component {
    constructor(props) {
        super(props);
    }

    capitalized(value) {
        value = value.replace(/_/g, ' ').trim();
        return value.charAt(0)
            .toUpperCase()
            .concat(value.slice(1))
    }

    tableTD (value) {
        if (!isArray(value) && isObject(value)) {
            unset(value, '_id'); unset(value, 'created_at'); unset(value, 'updated_at');
            return Object.entries(value).map(
                (item, index) => (
                    <div>
                        <strong>{this.capitalized(item[0])}</strong>
                        &nbsp; : &nbsp;
                        {item[1]}
                    </div>
                )
            )
        } else {
            return value;
        }
    }

    render() {
        const {result} = this.props;
        return (
            <table className="table table-sm table-bordered table-hover">
                <tbody>
                {
                    Object.entries(result).map((item, index) =>
                        (<tr key={index}>
                            <td style={{fontWeight: 'bold'}}>{this.capitalized(item[0])}</td>
                            <td>{this.tableTD(item[1])}</td>
                        </tr>)
                    )
                }

                </tbody>
            </table>
        );
    }
}

export default View;