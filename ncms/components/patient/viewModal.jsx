import React, {Component} from "react";
import {Alert, Modal, View} from "../common";
import api from "../../store/api";

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: "view-patient-modal",
            patient: null,
            response: null
        };
        this.onView = this.onView.bind(this);
    }

    async onView(id) {
        this.setState({response: null});
        const patient = await api.showPatient(id);
        if (patient.status === 'error') {
            this.setState({response: patient});
        } else {
            this.setState({modal:true, patient: patient.results});
        }
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    render() {
        const { modal, modalId, patient, response } = this.state;
        return (
            <div>
                { response &&
                <Alert data={response} id="view-alert"/>
                }

                { modal && patient &&
                <Modal
                    id={modalId}
                    size="modal-lg"
                    icon="patient-05.png"
                    title="Patient Information"
                    onClose={() => {
                        this.setState({
                            modal: false,
                        });
                    }}>
                    <View result={patient}/>
                </Modal>
                }
            </div>
        );
    }
}

export default ViewModal;