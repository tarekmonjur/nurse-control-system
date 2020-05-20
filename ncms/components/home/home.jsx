import React, {Component} from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/emergency-call.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br />
                                        <small className="card-text text-muted">Total Nurse Call</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/incoming-call.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br />
                                        <small className="card-text text-muted">Total Call Received</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/present-call.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br />
                                        <small className="card-text text-muted">Total Call Present</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/done-call.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br />
                                        <small className="card-text text-muted">Total Call Done</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/missed-call.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br />
                                        <small className="card-text text-muted">Total Call Missed</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/present-call.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br />
                                        <small className="card-text text-muted">Total not Present</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/call-emergency.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br/>
                                        <small className="card-text text-muted">Emergency Call</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/patient-05.png"
                                         style={{width: 100+'%'}}
                                         className="card-img" alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br/>
                                        <small className="card-text text-muted">Total Patients</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/bed-03.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br/>
                                        <small className="card-text text-muted">Total Bed & Device</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/patient-04.png"
                                         style={{width: 100+'%'}}
                                         className="card-img" alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br/>
                                        <small className="card-text text-muted">Total Doctors</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/nurse.png"
                                         style={{width: 100+'%'}}
                                         className="card-img"
                                         alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br/>
                                        <small className="card-text text-muted">Total Nurses</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <div className="card-header p-3">
                                    <img src="../img/administrator.png"
                                         style={{width: 100+'%'}}
                                         className="card-img" alt="..." />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h3 className="card-title m-0">1234 <br/>
                                        <small className="card-text text-muted">Total Admin</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Home);