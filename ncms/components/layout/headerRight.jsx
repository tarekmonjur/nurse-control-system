import React, {Component} from 'react';
import { connect } from 'react-redux';

class HeaderRight extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-3 col-sm-3 user">
                <div className="row">
                    <div className="col-md-2 col-sm-2">
                        <img src="../img/user.png" alt="" />
                    </div>
                    <div className="col-md-10 col-md-10">
                        <h6 className="font-weight-bold">Tarek Ahammed Monjur
                            <br />
                            <small> ABCD Doctor.</small>
                            <br />
                            <small> 01780292737</small>
                            <br />
                            <small> tarekmonjur@gmail.com</small>
                            <br />
                            <small><a href="">Logout.</a></small>
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}

// export default connect(state => state)(Home);
export default HeaderRight;