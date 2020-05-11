import React, {Component} from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        const {user} = this.state;
        return (
            <div>
                <div className="banner">
                    <img src="../img/hospital-banner.png" alt="" />
                </div>

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
                                <form name="form-login">
                                    <div className="form-row">
                                        <div className="col-md-12 col-sm-12 mb-3">
                                            <label htmlFor="username">Username</label>
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <img src="../img/administrator.png" alt="" />
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" id="username" required />
                                            </div>
                                            <small id="usernameHelpBlock" className="form-text text-muted">
                                                Your password must be 8-20 characters long.
                                            </small>
                                            <div className="invalid-feedback">
                                                Please choose a username.
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
                                                <input type="password" className="form-control is-invalid" id="password"
                                                       required />
                                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                                        Your password must be 8-20 characters long, contain letters and numbers,
                                                        and must not contain spaces, special characters, or emoji.
                                                    </small>
                                                    <div className="invalid-feedback">
                                                        Please choose a password.
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-sm btn-primary" type="submit">Login</button>
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