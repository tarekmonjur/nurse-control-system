import React, {Component} from "react";
import {Alert, Modal, View} from "../common";
import api from "../../store/api";

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: "add-bed-modal",
            bed: null,
            response: null
        };
        this.onView = this.onView.bind(this);
    }

    async onView(id) {
        this.setState({ response: null });
        const bed = await api.showBed(id);
        if (bed.status === 'error') {
            this.setState({ response: bed });
        } else {
            this.setState( { modal:true, bed: bed.results });
        }
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    render() {
        const { modal, modalId, bed, response } = this.state;
        return (
            <div>
                { response &&
                <Alert data={response} id="view-alert"/>
                }

                { modal && bed &&
                <Modal
                    id={modalId}
                    size="modal-lg"
                    icon="bed-02.png"
                    title="Bed & Device Information"
                    onClose={() => {
                        this.setState({
                            modal: false,
                        });
                    }}>
                    <View result={bed}/>
                </Modal>
                }
            </div>
        );
    }
}

export default ViewModal;