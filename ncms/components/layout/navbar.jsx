import React, {Component} from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        const { user } = this.state;
        return (
            <div id="navbar" className="container-fluid sticky-top">
                <nav className="navbar navbar-expand-lg">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        Main Menu
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    <img src="../img/hospital-02.png" alt="" />
                                        Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/patient">
                                    <img src="../img/patient.png" alt="" />
                                        Patient</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/patient-bed">
                                    <img src="../img/bed-02.png" alt="" />
                                        Bed & Device</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/doctor">
                                    <img src="../img/doctor.png" alt="" />
                                        Doctor</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/nurse">
                                    <img src="../img/nurse.png" alt="" />
                                        Nurse</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/call-history">
                                    <img src="../img/emergency-call.png" alt="" />
                                        Call History</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/real-time-call">
                                    <img src="../img/ecg.png" alt="" />
                                        Real Time Call</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/report">
                                    <img src="../img/report-01.png" alt="" />
                                        Report</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown">
                                    <img src="../img/administration.png" alt="" />
                                        Administration
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/news">
                                        <img src="../img/news.png" alt="" />
                                            News</a>
                                    <a className="dropdown-item" href="/administrator">
                                        <img src="../img/administrator.png" alt="" />
                                            Administrator</a>
                                    <a className="dropdown-item" href="/settings">
                                        <img src="../img/gear.png" alt="" />
                                            App Settings</a>
                                </div>
                            </li>
                        </ul>
                        <span className="navbar-text">Date: 2/2/2020, HotLine - 01780292737</span>
                    </div>
                </nav>
            </div>
        )
    }
}

export default connect(state => state)(Navbar);