import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { isEmpty, isDate } from 'lodash';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            formData: this.props.info
        };
        this.handleChange = this.handleChange.bind(this);
    }

    init() {
        let formData = {};
        const form = document.querySelector(`form[name="${this.props.formName}"]`);
        for (let i = 0; i < form.elements.length; i++) {
            if (!isEmpty(form.elements[i].name)) {
                if (form.elements[i].type === 'radio') {
                    if (form.elements[i].checked)
                        formData[form.elements[i].name] = form.elements[i].value;
                } else {
                    formData[form.elements[i].name] = form.elements[i].value;
                }
            }
        }
        this.setState({formData: formData})
    }

    componentDidMount() {
        this.init();
    }

    handleChange(event) {
        let stateData = {};
        if (isDate(event)) {
            stateData = {
                formData: {
                    ...this.state.formData,
                    joining : event.toISOString().split('T')[0],
                },
                date: event,
            };
        } else {
            stateData = {
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value,
                },
            };
        }
        this.props.handleChange(stateData.formData);
        this.setState(stateData);
    };

    render() {
        const {formName, errors, user_groups} = this.props;
        const {formData} = this.state;
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
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="Enter user name.."/>
                            {errors.name &&
                            <div className="invalid-feedback">{errors.name}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="group">User Group : <span className="text-danger">*</span></label>
                            <select
                                className="form-control form-control-sm"
                                name="group"
                                value={formData.group}
                                onChange={this.handleChange}
                                id="group">
                                {
                                    user_groups.map((group) => (
                                        <option key={group._id} value={group._id}>{group.name}</option>
                                    ))
                                }

                            </select>
                            {errors.group &&
                            <div className="invalid-feedback">{errors.group}</div>
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
                                value={formData.email}
                                onChange={this.handleChange}
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
                                value={formData.department}
                                onChange={this.handleChange}
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
                                value={formData.designation}
                                onChange={this.handleChange}
                                placeholder="Enter designation.."/>
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
                                type="text"
                                id="mobile_no"
                                className={`form-control form-control-sm ${errors.mobile_no && 'is-invalid'}`}
                                name="mobile_no"
                                value={formData.mobile_no}
                                onChange={this.handleChange}
                                placeholder="Enter mobile no..."/>
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
                                onChange={this.handleChange}
                                selected={formData.joining ? new Date(formData.joining) : this.state.date}
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
                                    value="male"
                                    checked={formData.gender && formData.gender === 'male'}
                                    onChange={this.handleChange}/>
                                <label className="form-check-label"
                                       htmlFor="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio2"
                                    className="form-check-input"
                                    name="gender"
                                    checked={formData.gender && formData.gender === 'female'}
                                    onChange={this.handleChange}
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
                                    checked={formData.gender && formData.gender === 'other'}
                                    onChange={this.handleChange}
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
                            <label htmlFor="username">User Name : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="username"
                                className={`form-control form-control-sm ${errors.username && 'is-invalid'}`}
                                name="username"
                                value={formData.username}
                                onChange={this.handleChange}
                                placeholder="Enter Username..."/>
                            {errors.username &&
                            <div className="invalid-feedback">{errors.username}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="password">Password : <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                id="password"
                                className={`form-control form-control-sm ${errors.password && 'is-invalid'}`}
                                name="password"
                                value={formData.password}
                                onChange={this.handleChange}
                                placeholder="Enter password..."/>
                            {errors.password &&
                            <div className="invalid-feedback">{errors.password}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password : <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                id="confirm_password"
                                className={`form-control form-control-sm ${errors.confirm_password && 'is-invalid'}`}
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={this.handleChange}
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
                                value={formData.address}
                                onChange={this.handleChange}
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