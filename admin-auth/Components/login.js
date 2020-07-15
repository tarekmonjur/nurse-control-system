import '../public/scss/login.scss';
import 'bootstrap';
import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import { isEmpty } from 'lodash';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: '',
            },
            errors: {}
        };
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    };

    checkValidation = (data) => {
        const errors = {};
        if (!validator.isEmail(data.email)) {
            errors.email = 'Please enter valid email';
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'Please enter email';
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'Please enter password';
        }
        return errors;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { data } = this.state;
        // const eventTarget = e.target;
        // const formData = {};

          // for (let field in data) {
        //     formData[field] = eventTarget[field].value;
        // }
        // this.setState({
        //    data: formData
        // });

        const errors = this.checkValidation(data);
        this.setState({errors});
        console.log('errors: ',errors);
        console.log('data: ',data);
        if (isEmpty(errors)) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            fetch(`${process.env.HOST}:${process.env.PORT}/login`, options)
                .then((response) => { return response.json(); })
                .then((data) => {
                    if (!data.error) {
                        window.location.href = '/';
                    } else {
                        this.setState({
                            errors: data
                        })
                    }
                })
                .catch(err => console.log({err}))

    }

    };

    render() {
        console.log('render....');
        const { errors } = this.state;
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <img className="mb-4"
                     src="img/health.png"
                     alt=""
                     width="72"
                     height="72" />
                <h1 className="h3 mb-3 font-weight-normal">System SignIn</h1>
                { errors.error &&
                    <p className="text-danger">{errors.error}</p>
                }
                <label htmlFor="email"
                       className="sr-only">Email address</label>
                <input type="email"
                       id="email"
                       name="email"
                       className={ errors.email ? 'form-control is-invalid' : 'form-control' }
                       placeholder="Email address"
                       onChange={this.handleChange}
                       autoFocus />
                <label htmlFor="password"
                       className="sr-only">Password</label>
                <input type="password"
                       id="password"
                       name="password"
                       className={ errors.password ? 'form-control is-invalid' : 'form-control' }
                       onChange={this.handleChange}
                       placeholder="Password" />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox"
                               name="remember_me"
                               value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block"
                        type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
            </form>
        );
    }
}

$(function(){
    ReactDOM.render(
        <Login />,
        document.querySelector('body')
    );
});


