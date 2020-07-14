import React, {Component} from 'react';
import { connect } from 'react-redux';

class HeaderLeft extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6 col-sm-6 logo-title">
                <div className="d-flex flex-row">
                    <div className="pr-2">
                        <img src="../img/health.png" alt="" />
                    </div>
                    <div className="pl-2">
                        <h3 className="font-weight-bold">Bangladesh Medical Hospital Ltd.
                            <br />
                            <small> Health is Well, All is Well.</small>
                            <br />
                            <small className="lead">Road-01, Sector-12, Uttara-Dhaka, Bangladesh.</small>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

// export default connect(state => state)(Home);
export default HeaderLeft;