import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import validator from 'validator';
import {Loading, Alert} from './../common';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            formData: {},
            errors: {},
            loading: false,
            response: null
        };
    }

    componentDidMount() {
        let formData = {};
        const form = document.querySelector('form[name="form-login"]');
        for (let i=0; i < form.elements.length; i++) {
            if (!isEmpty(form.elements[i].name)) {
                formData[form.elements[i].name] = form.elements[i].value;
            }
        }
        this.setState({formData: formData});
    }

    handleChange = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value,
            },
            response: null
        });
    };

    validate(data) {
        const errors = {};
        if (!validator.isEmail(data.email)) {
            errors.email = 'Please enter valid email';
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'The email is required';
        }
        if (!validator.isLength(data.password, {min: 6, max: 20})) {
            errors.password = 'The password length must be min 6 and max 20'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'The password is required';
        }
        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true, response: null});
        const formData = this.state.formData;
        const errors = this.validate(formData);
        this.setState({errors});

        if (isEmpty(errors)) {
            console.log(formData);

            fetch(`${process.env.HOST}:${process.env.PORT}/api/login`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    errors: result.errors || {},
                    response: result,
                    loading: false
                });
                if (result.status === 'success') {
                    window.location.href='/';
                }
            })
        } else {
            this.setState({loading: false});
        }
    };

    render() {
        const {user, errors, loading, response} = this.state;
        console.log(response);
        return (
            <div>
                <div className="banner">
                    <img src="../img/hospital-banner.png" alt="" />
                </div>
                { response &&
                    <Alert data={response} />
                }
                <div className="row justify-content-center">
                    <div className="col-md-4 col-sm-12 mt-5">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <img src="../img/administration.png" alt="" />
                                            Administration Login
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form name="form-login" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-12 col-sm-12 mb-3">
                                            <label htmlFor="email">User Email</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <img src="../img/administrator.png" alt="" />
                                                    </div>
                                                </div>
                                                <input type="text"
                                                    className={`form-control ${errors.email?'is-invalid':''}`}
                                                    name="email"
                                                    onChange={this.handleChange}
                                                    id="email" />
                                                { errors.email &&
                                                <div className="invalid-feedback">{errors.email}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
        
                                    <div className="form-row">
                                        <div className="col-md-12 col-sm-12 mb-3">
                                            <label htmlFor="password">Password</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <img src="../img/password.png" alt="" />
                                                    </div>
                                                </div>
                                                <input type="password"
                                                    id="password"
                                                    className={`form-control ${errors.password?'is-invalid':''}`}
                                                    onChange={this.handleChange}
                                                    name="password" />
                                                { errors.password &&
                                                    <div className="invalid-feedback">{errors.password}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        disabled={loading}
                                        type="submit">
                                        {loading ?
                                            <Loading
                                                height="50%"
                                                width="50%" /> :
                                            'Login'
                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(Login);