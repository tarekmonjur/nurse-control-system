import React, {Component} from "react";
import {Alert, Modal, View} from "../common";
import api from "../../store/api";

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: "view-nurse-modal",
            nurse: null,
            response: null
        };
        this.onView = this.onView.bind(this);
    }

    async onView(id) {
        this.setState({ response: null });
        const nurse = await api.showNurse(id);
        if (nurse.status === 'error') {
            this.setState({ response: nurse });
        } else {
            this.setState( { modal:true, nurse: nurse.results });
        }
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    render() {
        const { modal, modalId, nurse, response } = this.state;
        return (
            <div>
                { response &&
                <Alert data={response} id="view-alert"/>
                }

                { modal && nurse &&
                <Modal
                    id={modalId}
                    size="modal-lg"
                    icon="nurse-02.png"
                    title="Nurse Information"
                    onClose={() => {
                        this.setState({
                            modal: false,
                        });
                    }}>
                    <View result={nurse}/>
                </Modal>
                }
            </div>
        );
    }
}

export default ViewModal;