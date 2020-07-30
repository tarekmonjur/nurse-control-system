import React, {Component} from "react";

class Form extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.init();
    }

    render() {
        const {formName, errors, info} = this.props;
        return (
            <form name={formName}>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="bed_no">Bed Number : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="bed_no"
                                className={`form-control form-control-sm ${errors.bed_no && 'is-invalid'}`}
                                name="bed_no"
                                value={info.bed_no}
                                onChange={this.props.handleChange}
                                placeholder="Enter bed number.."/>
                            {errors.bed_no &&
                            <div className="invalid-feedback">{errors.bed_no}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="device_no">Device Number : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="device_no"
                                className={`form-control form-control-sm ${errors.device_no && 'is-invalid'}`}
                                name="device_no"
                                value={info.device_no}
                                onChange={this.props.handleChange}
                                placeholder="Enter device number.."/>
                            {errors.device_no &&
                            <div className="invalid-feedback">{errors.device_no}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="bed_type">Bed Type :</label>
                            <select
                                className="form-control form-control-sm"
                                name="bed_type"
                                value={info.bed_type}
                                onChange={this.props.handleChange}
                                id="bed_type">
                                <option value="Normal">Normal</option>
                                <option value="AC">AC</option>
                                <option value="VIP">VIP</option>
                                <option value="Cabin">Cabin</option>
                            </select>
                            {errors.bed_type &&
                            <div className="invalid-feedback">{errors.bed_type}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="bed_price">Bed Price : </label>
                            <input
                                type="text"
                                id="bed_price"
                                className={`form-control form-control-sm ${errors.bed_price && 'is-invalid'}`}
                                name="bed_price"
                                value={info.bed_price}
                                onChange={this.props.handleChange}
                                placeholder="Enter bed price.."/>
                            {errors.bed_price &&
                            <div className="invalid-feedback">{errors.bed_price}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="bed_location">Bed Location :</label>
                        <textarea
                            id="bed_location"
                            className={`form-control form-control-sm ${errors.bed_location && 'is-invalid'}`}
                            name="bed_location"
                            value={info.bed_location}
                            onChange={this.props.handleChange}
                            placeholder="Bed location..."/>
                        {errors.bed_location &&
                        <div className="invalid-feedback">{errors.bed_location}</div>
                        }
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;