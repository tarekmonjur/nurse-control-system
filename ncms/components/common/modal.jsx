import React, {Component} from "react";
import {Loading} from "./index";

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(`#${this.props.id}`).modal('show');
    }

    componentWillUnmount() {
        $(`#${this.props.id}`).modal('hide');
    }

    render() {
        const {id, icon, title, size, button, loading} = this.props;
        return (
            <div className="modal fade"
                 id={id}
                 data-backdrop="static"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className={`modal-dialog modal-dialog-scrollable ${size}`}
                     role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title"
                                id="exampleModalLabel">
                                <img src={`../img/${icon}`} alt="" />
                                &nbsp;<span>{title}</span>
                            </h6>
                            <button
                                type="button"
                                className="close"
                                onClick={() => {
                                    this.props.onClose();
                                }}
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body"
                             style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            { button &&
                                <button
                                    type="submit"
                                    onClick={this.props.onSubmit}
                                    className="btn btn-sm btn-primary col-3"
                                    disabled={loading} >
                                    {loading ?
                                        <Loading col="col-4" /> :
                                        button
                                    }
                                </button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;