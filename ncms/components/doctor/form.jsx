import React, {Component} from "react";
import DatePicker from "react-datepicker";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { set_auth: false };
    }

    componentDidMount() {
        this.props.init();
    }

    setupAuth() {
        const set_auth = !this.state.set_auth;
        this.setState({set_auth});
        setTimeout(() => {this.props.init()}, 300)
    }

    render() {
        const {formName, errors, date, info, nurses} = this.props;
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
                            <label htmlFor="nurse">Assistant of Doctor (Nurse) :</label>
                            <select
                                className={`form-control form-control-sm ${errors.nurse && 'is-invalid'}`}
                                name="nurse"
                                id="nurse"
                                value={info.nurse}
                                onChange={this.props.handleChange}>
                                <option value="">-- Select Assistant--</option>
                                { nurses && nurses.map((nurse, index) => (
                                    <option key={index} value={nurse._id}>{nurse.name}</option>
                                    ))
                                }
                            </select>
                            {errors.nurse &&
                            <div className="invalid-feedback">{errors.nurse}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="email">Email Address : </label>
                            <input
                                type="text"
                                id="email"
                                className={`form-control form-control-sm ${errors.email && 'is-invalid'}`}
                                name="email"
                                value={info.email}
                                onChange={this.props.handleChange}
                                placeholder="Enter email.."/>
                            {errors.email &&
                            <div className="invalid-feedback">{errors.email}</div>
                            }
                        </div>
                    </div>
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
                            <label htmlFor="joining">Joining Date :</label>
                            <DatePicker
                                id="joining"
                                name="joining"
                                className={`form-control form-control-sm ${errors.joining && 'is-invalid'}`}
                                onChange={this.props.handleChange}
                                selected={info.joining ? new Date(info.joining) : date}
                                placeholder="Joining date..."/>
                            {errors.joining &&
                            <div className="invalid-feedback">{errors.joining}</div>
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
                <div className="col">
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                id="inlineCheckbox1"
                                className="form-check-input"
                                onChange={() => this.setupAuth()}
                                />
                            <label className="form-check-label"
                                   htmlFor="inlineCheckbox1">Setup Auth</label>
                        </div>
                    </div>
                </div>
                {this.state.set_auth &&
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
                                    type="password"
                                    id="password"
                                    className={`form-control form-control-sm ${errors.password && 'is-invalid'}`}
                                    name="password"
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
                                    type="password"
                                    id="confirm_password"
                                    className={`form-control form-control-sm ${errors.confirm_password && 'is-invalid'}`}
                                    name="confirm_password"
                                    onChange={this.props.handleChange}
                                    placeholder="Enter confirm password..."/>
                                {errors.confirm_password &&
                                <div className="invalid-feedback">{errors.confirm_password}</div>
                                }
                            </div>
                        </div>
                    </div>
                }
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