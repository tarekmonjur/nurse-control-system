import React, {Component} from "react";
import {connect} from "react-redux";
import {isEmpty, isDate} from 'lodash';
import validator from 'validator';
import DatePicker from "react-datepicker";


class AddPatient extends Component {
    constructor(props) {
        super(props);
        const {setChild, formName} = this.props;
        this.setChild = setChild;
        this.formName = formName;
        this.state = {
            formData: {},
            errors: {},
            date: new Date()
        }
    }

    handleChange = (event) => {
        if (isDate(event)) {
            this.setState({
                formData: {
                    ...this.state.formData,
                    admitted_date : event.toISOString().split('T')[0],
                },
                date: event
            });
        } else {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value,
                }
            });
        }

    };

    handleValidate(data) {
        const errors = {};
        if (validator.isEmpty(data.name)) {
            errors['name'] = 'This field is required';
        }
        if (!validator.isEmpty(data.bed_no) &&
            !validator.isLength(data.bed_no, {min: 3, max: 10})) {
            errors['bed_no'] = 'This field length min:3 max:10';
        }
        if (!validator.isMobilePhone(data.mobile_no,['bn-BD'])) {
            errors.mobile_no = 'Please enter valid number';
        }
        if (!validator.isEmpty(data.address) &&
            !validator.isLength(data.address, {min: 10, max: 255})) {
            errors.address = 'This field length min:10 max:255';
        }
        return errors;
    }

    handleSubmit() {
        const formData = this.state.formData;
        const errors = this.handleValidate(formData);
        this.setState({errors});
        if (isEmpty(errors)) {
            console.log(formData);
        } else {
            console.log(errors);
        }

    };

    componentDidMount() {
        this.setChild(this);
        let formData = {};
        const form = document.querySelector(`form[name="${this.formName}"]`);
        for (let i=0; i < form.elements.length; i++) {
            if (!isEmpty(form.elements[i].name)) {
                formData[form.elements[i].name] = form.elements[i].value;
            }
        }
        this.setState({formData});
    }

    render() {
        const {errors, date} = this.state;
        return (
            <div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="name">Patient Name : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                className={`form-control form-control-sm ${errors.name && 'is-invalid'}`}
                                name="name"
                                onChange={this.handleChange}
                                placeholder="Enter patient name.." />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="bed_no">Patient Bed No : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="bed_no"
                                className={`form-control form-control-sm ${errors.bed_no && 'is-invalid'}`}
                                name="bed_no"
                                onChange={this.handleChange}
                                placeholder="Enter patient bed no.." />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="guardian_name">Guardian Name :</label>
                            <input
                                type="text"
                                id="guardian_name"
                                className={`form-control form-control-sm ${errors.guardian_name && 'is-invalid'}`}
                                name="guardian_name"
                                onChange={this.handleChange}
                                placeholder="Enter patient guardian name.." />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="mobile_no">Patient Mobile No : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="mobile_no"
                                className={`form-control form-control-sm ${errors.mobile_no && 'is-invalid'}`}
                                name="mobile_no"
                                onChange={this.handleChange}
                                placeholder="Enter patient mobile no.." />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label>Patient Gender :</label><br />
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio1"
                                    className="form-check-input"
                                    name="gender"
                                    onChange={this.handleChange}
                                    value="male" />
                                <label className="form-check-label"
                                       htmlFor="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio2"
                                    className="form-check-input"
                                    name="gender"
                                    onChange={this.handleChange}
                                    value="female" />
                                <label className="form-check-label"
                                       htmlFor="inlineRadio2">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio3"
                                    className="form-check-input"
                                    name="gender"
                                    onChange={this.handleChange}
                                    value="other" />
                                <label className="form-check-label"
                                       htmlFor="inlineRadio3">Other</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="admitted_date">Admitted Date :</label>
                            <DatePicker
                                id="admitted_date"
                                className={`form-control form-control-sm ${errors.admitted_date && 'is-invalid'}`}
                                onChange={this.handleChange}
                                selected={date}
                                placeholder="admit date..." />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="address">Patient Address :</label>
                        <textarea
                            id="address"
                            className={`form-control form-control-sm ${errors.address && 'is-invalid'}`}
                            name="address"
                            onChange={this.handleChange}
                            placeholder="Address..." />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(AddPatient);