import React, {Component} from "react";
import {connect} from "react-redux";


class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="modal fade" id={this.props.id} data-backdrop="static" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="exampleModalLabel">
                                <img src={`../img/${this.props.icon}`} alt="" />
                                <span>{this.props.title}</span>
                            </h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form name={this.props.id} onSubmit={(event) => { event.preventDefault(); this.props.onsubmit(); }}>
                            <div className="modal-body" style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-sm btn-primary">{this.props.submitButton}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;