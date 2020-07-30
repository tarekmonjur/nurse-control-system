import React, {Component} from 'react';
import { connect } from 'react-redux';

class HeaderRight extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }

    render() {
        return (
            <div className="col-md-3 col-sm-3 user">
                <div className="row">
                    <div className="col-md-2 col-sm-2">
                        <img src="../img/user.png" alt="" />
                    </div>
                    <div className="col-md-10 col-md-10">
                        <h6 className="font-weight-bold">{this.user.name}
                            <br />
                            <small> {this.user.designation}</small>
                            <br />
                            <small> {this.user.mobile_no}</small>
                            <br />
                            <small> {this.user.email}</small>
                            <br />
                            <small><a href="/logout">Logout.</a></small>
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(HeaderRight);