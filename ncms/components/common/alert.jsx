import React, {Component} from "react";
import { capitalize } from 'lodash';

class Alert extends Component {
    constructor(props) {
        super(props);
        const response = this.props.data;
        this.data = {
            type: response.code === 200 ? 'success' : 'danger',
            title: `${response.status} message!`,
            icon: `${response.status}.png`,
            message: response.message,
        };
    }

    componentDidMount() {
        $('.toast').toast('show');
    }

    componentWillUnmount() {
        this.hide();
    }

    hide() {
        $('.toast').toast('hide');
    }

    render() {
        return (
            <div style={{position: 'relative', zIndex: 9999}}>
                <div className="toast mr-3"
                     role="alert"
                     aria-live="assertive"
                     aria-atomic="true"
                     data-delay="5000"
                     data-autohide="true"
                     style={{position: 'absolute', top: 0, right: 0, minWidth: '200px'}}>
                    <div className="toast-header">
                        <img src={`../img/${this.data.icon}`}
                             className="rounded mr-2"
                             style={{width: '11%'}} alt="..."/>
                        <strong className="mr-auto">{capitalize(this.data.title)}</strong>
                        <button
                            type="button"
                            onClick={this.hide}
                            className="ml-2 mb-1 close"
                            data-dismiss="toast"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={`toast-body text-${this.data.type}`}>{this.data.message}</div>
                </div>
            </div>
        );
    }
}

export default Alert;