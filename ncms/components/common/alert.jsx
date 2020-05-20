import React, {Component} from "react";
import { capitalize, isEmpty } from 'lodash';

class Alert extends Component {
    constructor(props) {
        super(props);
        const {type, title, icon, message} = this.props.data;
        this.data = {
            title: title,
            type: type,
            icon: icon,
            message: message,
        };
    }

    componentDidMount() {
        this.show();
        console.log('data', this.data);
    }

    componentDidUpdate() {
        this.show();
        console.log('data', this.data);
    }

    show() {
        $('.toast').toast('show');
    }

    hide() {
        $('.toast').toast('hide');
    }

    render() {

        return (
            <div style={{position: 'relative'}}>
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000" data-autohide="true"
                     style={{position: 'absolute', top: 0, right: 0}}>
                    <div className="toast-header">
                        <img src={`../img/${this.data.icon}`} className="rounded mr-2" style={{width: '11%'}} alt="..."/>
                        <strong className="mr-auto">{capitalize(this.data.title)}</strong>
                        <button type="button" onClick={this.hide} className="ml-2 mb-1 close" data-dismiss="toast"
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