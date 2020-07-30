import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getData,
} from './../../store/actions';
import {
    Table,
    ListTitle,
    Alert
} from './../common';
import {map, forEach, unset} from 'lodash';

import * as io from 'socket.io-client';
const PATIENT_UI_UPDATE_TOPIC = 'broker/ui/patient';

class List extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null, alerts: [] };
        this.alerts = {};
    }

    async componentDidMount() {

        const client = io(`ws://${process.env.IO_HOST}/patient?token=${this.user && this.user.token}`, {
            path: '/ncms',
            reconnectionAttempts: 15
        });

        client.on('connect', () => {
            if (client.connected) {
                console.log('client io connect');
                this.props.getData({ columns: this.props.columns });
            }
        });

        client.on(PATIENT_UI_UPDATE_TOPIC, (message) => {
            console.log('***********message***********',message);
            this.props.getData({ columns: this.props.columns });
            // this.setState({response: JSON.parse(message)});
            message = JSON.parse(message);
            const current_time = new Date().getTime();

            // remove unnecessary alert components
            forEach(this.alerts, (alert, key) => {
                const alert_time = new Date().setMinutes(new Date(parseInt(key, 10)).getMinutes() + 2);
                if (alert_time < current_time) {
                    unset(this.alerts, key);
                }
            });

            this.alerts = {
                ...this.alerts,
                [current_time]: <Alert data={message} key={current_time} id={current_time} type="multiple" width="300"/>
            };

            this.setState({
                alerts: this.alerts,
            });
        });
    }

    render() {
        const { data } = this.props;
        const { response, alerts } = this.state;
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <ListTitle
                                    title="Real Time Call List"
                                    icon="ecg-02.png"
                                />
                            </div>
                        </div>
                        <div className="card-body"
                             style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                            {data &&
                                <Table
                                    data={data}
                                    table_name="real_time_call"
                                />
                            }
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>

                { alerts &&
                    <div aria-live="polite" aria-atomic="true" style={{position: 'relative', zIndex: 9999}}>
                        <div style={{position: 'absolute', top: 0, right: 0, minWidth: '300px'}}>
                            { map(alerts, (alert, key) => alert) }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {...state, ...ownProps};
};

const actionCreators = {getResponse, getData};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
