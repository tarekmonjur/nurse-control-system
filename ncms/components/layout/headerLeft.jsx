import React, {Component} from 'react';
import { connect } from 'react-redux';

class HeaderLeft extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {settings} = this.props;
        return (
            <div className="col-md-6 col-sm-6 logo-title">
                <div className="d-flex flex-row">
                    <div className="pr-2">
                        {settings.logo ?
                          <img src={`./uploads/${settings.logo}`} alt="" />
                          :
                          <img src="../img/health.png" alt="" />
                        }

                    </div>
                    <div className="pl-2">
                        <h3 className="font-weight-bold">{settings.name}
                            <br />
                            <small>{settings.title}</small>
                            <br />
                            <small className="lead">{settings.address}</small>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

// export default connect(state => state)(Home);
export default HeaderLeft;