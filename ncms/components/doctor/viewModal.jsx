import React, {Component} from "react";
import {Alert, Modal, View} from "../common";
import api from "../../store/api";

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: "view-doctor-modal",
            doctor: null,
            response: null
        };
        this.onView = this.onView.bind(this);
    }

    async onView(id) {
        this.setState({ response: null });
        const doctor = await api.showDoctor(id);
        if (doctor.status === 'error') {
            this.setState({ response: doctor });
        } else {
            this.setState( { modal:true, doctor: doctor.results });
        }
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    render() {
        const { modal, modalId, doctor, response } = this.state;
        return (
            <div>
                { response &&
                <Alert data={response} id="view-alert"/>
                }

                { modal && doctor &&
                <Modal
                    id={modalId}
                    size="modal-lg"
                    icon="doctor.png"
                    title="Doctor Information"
                    onClose={() => {
                        this.setState({
                            modal: false,
                        });
                    }}>
                    <View result={doctor}/>
                </Modal>
                }
            </div>
        );
    }
}

export default ViewModal;