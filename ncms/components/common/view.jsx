import React, {Component} from "react";

class View extends Component {
    constructor(props) {
        super(props);
    }

    capitalized(value) {
        value = value.replace('_', ' ').trim();
        return value.charAt(0)
            .toUpperCase()
            .concat(value.slice(1))
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
                            <td>{item[1]}</td>
                        </tr>)
                    )
                }

                </tbody>
            </table>
        );
    }
}

export default View;