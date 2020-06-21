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
        const { route } = this.state;
        // console.log(route);
        return (
            <div id="navbar" className="container-fluid sticky-top">
                <nav className="navbar navbar-expand-lg">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        Main Menu
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className={`nav-item ${route === '' && 'active'}`}>
                                <a className="nav-link" href="/">
                                    <img src="../img/hospital-02.png" alt="" />
                                    &nbsp;Home</a>
                            </li>
                            <li className={`nav-item ${route === 'patients' && 'active'}`}>
                                <a className="nav-link" href="/patients">
                                    <img src="../img/patient.png" alt="" />
                                    &nbsp;Patient</a>
                            </li>
                            <li className={`nav-item ${route === 'beds' && 'active'}`}>
                                <a className="nav-link" href="/beds">
                                    <img src="../img/bed-02.png" alt="" />
                                    &nbsp;Bed & Device</a>
                            </li>
                            <li className={`nav-item ${route === 'doctors' && 'active'}`}>
                                <a className="nav-link" href="/doctors">
                                    <img src="../img/doctor.png" alt="" />
                                    &nbsp;Doctor</a>
                            </li>
                            <li className={`nav-item ${route === 'nurses' && 'active'}`}>
                                <a className="nav-link" href="/nurses">
                                    <img src="../img/nurse.png" alt="" />
                                    &nbsp;Nurse</a>
                            </li>
                            <li className={`nav-item ${route === 'call-history' && 'active'}`}>
                                <a className="nav-link" href="/call-history">
                                    <img src="../img/emergency-call.png" alt="" />
                                    &nbsp;Call History</a>
                            </li>
                            <li className={`nav-item ${route === 'real-time-call' && 'active'}`}>
                                <a className="nav-link" href="/real-time-call">
                                    <img src="../img/ecg.png" alt="" />
                                    &nbsp;Real Time Call</a>
                            </li>
                            <li className={`nav-item ${route === 'reports' && 'active'}`}>
                                <a className="nav-link" href="/reports">
                                    <img src="../img/report-01.png" alt="" />
                                    &nbsp;Report</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown">
                                    <img src="../img/administration.png" alt="" />
                                    &nbsp;Administration
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/news">
                                        <img src="../img/news.png" alt="" />
                                        &nbsp;News</a>
                                    <a className="dropdown-item" href="/users">
                                        <img src="../img/administrator.png" alt="" />
                                        &nbsp;Administrator</a>
                                    <a className="dropdown-item" href="/settings">
                                        <img src="../img/gear.png" alt="" />
                                        &nbsp;App Settings</a>
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