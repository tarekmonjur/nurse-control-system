import React, {Component} from "react";
import DatePicker from "react-datepicker";

class Form extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.init();
    }

    render() {
        const {formName, errors, date, info} = this.props;
        return (
            <form name={formName}>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="name">Full Name : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                className={`form-control form-control-sm ${errors.name && 'is-invalid'}`}
                                name="name"
                                value={info.name}
                                onChange={this.props.handleChange}
                                placeholder="Enter doctor name.."/>
                            {errors.name &&
                            <div className="invalid-feedback">{errors.name}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="assistant">Assistant of Doctor (Nurse) :</label>
                            <select
                                className="form-control form-control-sm"
                                name="assistant"
                                id="assistant">
                                <option value="Normal">Normal</option>
                                <option value="AC">AC</option>
                                <option value="VIP">VIP</option>
                                <option value="Cabin">Cabin</option>
                            </select>
                            {errors.assistant &&
                            <div className="invalid-feedback">{errors.assistant}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="department">Department : </label>
                            <input
                                type="text"
                                id="department"
                                className={`form-control form-control-sm ${errors.department && 'is-invalid'}`}
                                name="department"
                                value={info.department}
                                onChange={this.props.handleChange}
                                placeholder="Enter department.."/>
                            {errors.department &&
                            <div className="invalid-feedback">{errors.department}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="designation">Designation : </label>
                            <input
                                type="text"
                                id="designation"
                                className={`form-control form-control-sm ${errors.designation && 'is-invalid'}`}
                                name="designation"
                                value={info.designation}
                                onChange={this.props.handleChange}
                                placeholder="Enter bed price.."/>
                            {errors.designation &&
                            <div className="invalid-feedback">{errors.designation}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="mobile_no">Mobile No : <span className="text-danger">*</span></label>
                            <input
                                id="mobile_no"
                                className={`form-control form-control-sm ${errors.mobile_no && 'is-invalid'}`}
                                name="mobile_no"
                                value={info.mobile_no}
                                onChange={this.props.handleChange}
                                placeholder="Doctor mobile no..."/>
                            {errors.mobile_no &&
                            <div className="invalid-feedback">{errors.mobile_no}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="joining_date">Joining Date :</label>
                            <DatePicker
                                id="joining_date"
                                name="joining_date"
                                className={`form-control form-control-sm ${errors.joining_date && 'is-invalid'}`}
                                onChange={this.props.handleChange}
                                selected={info.joining_date ? new Date(info.joining_date) : date}
                                placeholder="Joining date..."/>
                            {errors.joining_date &&
                            <div className="invalid-feedback">{errors.joining_date}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Gender :</label><br/>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio1"
                                    className="form-check-input"
                                    name="gender"
                                    checked={info.gender === 'male'}
                                    onChange={this.props.handleChange}
                                    value="male"/>
                                <label className="form-check-label"
                                       htmlFor="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio2"
                                    className="form-check-input"
                                    name="gender"
                                    checked={info.gender === 'female'}
                                    onChange={this.props.handleChange}
                                    value="female"/>
                                <label className="form-check-label"
                                       htmlFor="inlineRadio2">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio3"
                                    className="form-check-input"
                                    name="gender"
                                    checked={info.gender === 'other'}
                                    onChange={this.props.handleChange}
                                    value="other"/>
                                <label className="form-check-label"
                                       htmlFor="inlineRadio3">Other</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="username">User Name :</label>
                            <input
                                id="username"
                                className={`form-control form-control-sm ${errors.username && 'is-invalid'}`}
                                name="username"
                                value={info.username}
                                onChange={this.props.handleChange}
                                placeholder="Enter Username..."/>
                            {errors.username &&
                            <div className="invalid-feedback">{errors.username}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="password">Password :</label>
                            <input
                                id="password"
                                className={`form-control form-control-sm ${errors.password && 'is-invalid'}`}
                                name="password"
                                value={info.password}
                                onChange={this.props.handleChange}
                                placeholder="Enter password..."/>
                            {errors.password &&
                            <div className="invalid-feedback">{errors.password}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password :</label>
                            <input
                                id="confirm_password"
                                className={`form-control form-control-sm ${errors.confirm_password && 'is-invalid'}`}
                                name="confirm_password"
                                value={info.confirm_password}
                                onChange={this.props.handleChange}
                                placeholder="Enter confirm password..."/>
                            {errors.confirm_password &&
                            <div className="invalid-feedback">{errors.confirm_password}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="address">Address :</label>
                            <textarea
                                id="address"
                                className={`form-control form-control-sm ${errors.address && 'is-invalid'}`}
                                name="address"
                                value={info.address}
                                onChange={this.props.handleChange}
                                placeholder="Enter address..."/>
                            {errors.address &&
                            <div className="invalid-feedback">{errors.address}</div>
                            }
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;