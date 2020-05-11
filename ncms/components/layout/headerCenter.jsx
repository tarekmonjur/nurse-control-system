import React, {Component} from 'react';
import { connect } from 'react-redux';

class HeaderCenter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-3 col-sm-3 status">
                <div className="row text-white">
                    <div className="col"><img src="../img/emergency-call.png" alt="" />Patient Call to Nurse</div>
                    <div className="col-1">:</div>
                    <div className="col-3">1000</div>
                </div>
                <div className="row text-warning">
                    <div className="col"><img src="../img/incoming-call.png" alt="" />Nurse Receive Patient Call
                    </div>
                    <div className="col-1">:</div>
                    <div className="col-3">100</div>
                </div>
                <div className="row text-dark">
                    <div className="col"><img src="../img/present-call.png" alt="" />Nurse Present to Patient</div>
                    <div className="col-1">:</div>
                    <div className="col-3">90</div>
                </div>
                <div className="row text-success">
                    <div className="col"><img src="../img/done-call.png" alt="" />Total Patient Call Done</div>
                    <div className="col-1">:</div>
                    <div className="col-3">80</div>
                </div>
                <div className="row text-danger">
                    <div className="col"><img src="../img/missed-call.png" alt="" />Total Patient Call Missed</div>
                    <div className="col-1">:</div>
                    <div className="col-3">20</div>
                </div>
            </div>
        )
    }
}

// export default connect(state => state)(Home);
export default HeaderCenter;