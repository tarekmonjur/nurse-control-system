import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {isEmpty} from 'lodash';
import validator from 'validator';

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let form = {};
        const formSignup = document.querySelector('form[name="form-signup"]');
        for (let i=0; i < formSignup.elements.length; i++) {
            if (!isEmpty(formSignup.elements[i].name)) {
                form[formSignup.elements[i].name] = formSignup.elements[i].value;
            }
        }
        this.setState({data: form});
        console.log('formSignup: ',form);
    }

    handleChange(event) {
        this.setState({
           data: {
               ...this.state.data,
               [event.target.name]: event.target.value,
           }
        });
    }

    handleValidate(data) {
        const errors = {};
        if (validator.isEmpty(data.fname)) {
            errors['fname'] = 'This field is required';
        }
        if (!validator.isEmpty(data.lname) &&
            !validator.isLength(data.lname, {min: 3, max: 10})) {
            errors['lname'] = 'This field length min:3 max:10';
        }
        if (!validator.isEmail(data.email)) {
            errors.email = 'Please enter valid email';
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required';
        }
        // if (!validator.matches(data.mobile_no, /^\+?(88)?01[3456789][0-9]{8}$/g)) {
        //     errors.mobile_no = 'Please enter valid number';
        // }
        if (!validator.isMobilePhone(data.mobile_no,['bn-BD'])) {
            errors.mobile_no = 'Please enter valid number';
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required';
        }
        if (!validator.equals(data.password, data.confirm_password)) {
            errors.confirm_password = 'Please enter the same password';
        }
        if (!validator.isEmpty(data.address) &&
            !validator.isLength(data.address, {min: 10, max: 255})) {
            errors.address = 'This field length min:10 max:255';
        }
        return errors;
    }

    handleSubmit(event){
        event.preventDefault();

        const data = this.state.data;
        const errors = this.handleValidate(data);
        this.setState({errors});
        console.log('error: ', errors);
        console.log('data:',data);
        if (isEmpty(errors)) {
            // let formElement = document.querySelector('form[name="form-signup"]');
            const form = new FormData();
            for(const key in data) {
                form.append(key, data[key]);
            }
            const fileField = document.querySelector('input[type="file"]');
            form.append('photo', fileField.files[0]);

            fetch(`${process.env.HOST}:${process.env.PORT}/signup`, {
                method: 'POST',
                body: form,
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status == 'success' && result.result._id) {
                        window.location.href='/login'
                    }
                    this.setState({
                        errors: {
                            status: result.status,
                            message: result.message
                        }
                    });

                })
                .catch(error => console.error('error', error));
        }
    }

    render() {
        let {data, errors} = this.state;
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <img src="img/health.png" alt="" width="72" height="72" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h2>Registration</h2>
                    </div>
                    <div className="card">
                        { errors.status &&
                            <div className={errors.status == 'success'? 'card-header text-success': 'card-header text-danger'}>{errors.message}</div>
                        }
                        <div className="card-body">
                            <form name="form-signup" onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="fname">First Name</label>
                                            <input type="text"
                                                   className={errors.fname ? 'form-control is-invalid': 'form-control'}
                                                   id="fname"
                                                   onChange={this.handleChange}
                                                   name="fname" />
                                            { errors.fname &&
                                            <div className="invalid-feedback">{ errors.fname }</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="lname">Last Name</label>
                                            <input type="text"
                                                   className={errors.lname ? 'form-control is-invalid': 'form-control'}
                                                   id="lname"
                                                   onChange={this.handleChange}
                                                   name="lname" />
                                            { errors.lname &&
                                            <div className="invalid-feedback">{ errors.lname }</div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text"
                                                   className={errors.email ? 'form-control is-invalid': 'form-control'}
                                                   id="email"
                                                   onChange={this.handleChange}
                                                   name="email" />
                                            { errors.email &&
                                            <div className="invalid-feedback">{ errors.email }</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="mobile_no">Mobile Number</label>
                                            <input type="text"
                                                   className={errors.mobile_no ? 'form-control is-invalid': 'form-control'}
                                                   id="mobile_no"
                                                   onChange={this.handleChange}
                                                   name="mobile_no" />
                                            { errors.mobile_no &&
                                            <div className="invalid-feedback">{ errors.mobile_no }</div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="password">Password</label>
                                            <input type="password"
                                                   className={errors.password ? 'form-control is-invalid': 'form-control'}
                                                   id="password"
                                                   onChange={this.handleChange}
                                                   name="password" />
                                            { errors.password &&
                                            <div className="invalid-feedback">{ errors.password }</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="confirm_password">Confirm Password</label>
                                            <input type="password"
                                                   className={errors.confirm_password ? 'form-control is-invalid': 'form-control'}
                                                   id="confirm_password"
                                                   onChange={this.handleChange}
                                                   name="confirm_password" />
                                            { errors.confirm_password &&
                                            <div className="invalid-feedback">{ errors.confirm_password }</div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="photo">Photo</label>
                                            <input type="file"
                                                   className={errors.photo ? 'form-control is-invalid': 'form-control'}
                                                   id="photo"
                                                   onChange={this.handleChange}
                                                   name="photo" />
                                            { errors.photo &&
                                            <div className="invalid-feedback">{ errors.photo }</div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group input-group-sm">
                                            <label htmlFor="address">Address</label>
                                            <textarea type="text"
                                                      className={errors.address ? 'form-control is-invalid': 'form-control'}
                                                      id="address"
                                                      onChange={this.handleChange}
                                                      name="address"
                                                      value={data.address} />
                                            { errors.address &&
                                            <div className="invalid-feedback">{ errors.address }</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-sm btn-primary" type="submit">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

$(function(){
    ReactDOM.render(
        <Signup />,
        document.getElementById('signup')
    );
});
