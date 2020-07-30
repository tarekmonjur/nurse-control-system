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
        const {formName, errors, date, info, beds} = this.props;
        return (
            <form name={formName}>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="name">Patient Name : <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                className={`form-control form-control-sm ${errors.name && 'is-invalid'}`}
                                name="name"
                                value={info.name}
                                onChange={this.props.handleChange}
                                placeholder="Enter patient name.."/>
                            {errors.name &&
                            <div className="invalid-feedback">{errors.name}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="bed">Patient Bed No : <span className="text-danger">*</span></label>
                            <select
                                className={`form-control form-control-sm ${errors.bed && 'is-invalid'}`}
                                name="bed"
                                value={info.bed}
                                onChange={this.props.handleChange}
                                id="bed">
                                {
                                    beds.map( bed => (
                                        <option key={bed._id} value={bed._id}>{bed.bed_no}</option>
                                    ))
                                }
                            </select>
                            {errors.bed &&
                            <div className="invalid-feedback">{errors.bed}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="patient_mobile_no">Patient Mobile No : </label>
                            <input
                                type="text"
                                id="patient_mobile_no"
                                className={`form-control form-control-sm ${errors.patient_mobile_no && 'is-invalid'}`}
                                name="patient_mobile_no"
                                value={info.patient_mobile_no}
                                onChange={this.props.handleChange}
                                placeholder="Enter patient mobile no.."/>
                            {errors.patient_mobile_no &&
                            <div className="invalid-feedback">{errors.patient_mobile_no}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Patient Gender :</label><br/>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="inlineRadio1"
                                    className="form-check-input"
                                    name="gender"
                                    checked={info.gender && info.gender === 'male'}
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
                                    checked={info.gender && info.gender === 'female'}
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
                                    checked={info.gender && info.gender === 'other'}
                                    onChange={this.props.handleChange}
                                    value="other"/>
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
                                name="admitted_date"
                                className={`form-control form-control-sm ${errors.admitted_date && 'is-invalid'}`}
                                onChange={(event) => this.props.handleChange(event, 'admitted_date')}
                                selected={info.admitted_date ? new Date(info.admitted_date) : date}
                                placeholder="Admit date..."/>
                            {errors.admitted_date &&
                            <div className="invalid-feedback">{errors.admitted_date}</div>
                            }
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
                                value={info.guardian_name}
                                onChange={this.props.handleChange}
                                placeholder="Enter guardian name.."/>
                            {errors.guardian_name &&
                            <div className="invalid-feedback">{errors.guardian_name}</div>
                            }
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="guardian_mobile_no">Guardian Mobile No : </label>
                            <input
                                type="text"
                                id="guardian_mobile_no"
                                className={`form-control form-control-sm ${errors.guardian_mobile_no && 'is-invalid'}`}
                                name="guardian_mobile_no"
                                value={info.guardian_mobile_no}
                                onChange={this.props.handleChange}
                                placeholder="Enter guardian mobile no.."/>
                            {errors.guardian_mobile_no &&
                            <div className="invalid-feedback">{errors.guardian_mobile_no}</div>
                            }
                        </div>
                    </div>
                    {info &&
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="release_date">Release Date :</label>
                            <DatePicker
                                id="release_date"
                                name="release_date"
                                className={`form-control form-control-sm ${errors.admitted_date && 'is-invalid'}`}
                                onChange={(event) => this.props.handleChange(event, 'release_date')}
                                selected={info.release_date && new Date(info.release_date)}
                                placeholder="Release date..."/>
                            {errors.release_date &&
                            <div className="invalid-feedback">{errors.release_date}</div>
                            }
                        </div>
                    </div>
                    }
                </div>
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="address">Patient Address :</label>
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
            </form>
        );
    }
}

export default Form;