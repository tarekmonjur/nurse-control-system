import React, {Component} from "react";
import {Alert, Modal, View} from "../common";
import api from "../../store/api";

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: "view-user-modal",
            user: null,
            response: null
        };
        this.onView = this.onView.bind(this);
    }

    async onView(id) {
        this.setState({ response: null });
        const user = await api.showUser(id);
        if (user.status === 'error') {
            this.setState({ response: user });
        } else {
            this.setState( { modal:true, user: user.results });
        }
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    render() {
        const { modal, modalId, user, response } = this.state;
        return (
            <div>
                { response &&
                <Alert data={response} id="view-alert"/>
                }

                { modal && user &&
                <Modal
                    id={modalId}
                    size="modal-lg"
                    icon="user.png"
                    title="User Information"
                    onClose={() => {
                        this.setState({
                            modal: false,
                        });
                    }}>
                    <View result={user}/>
                </Modal>
                }
            </div>
        );
    }
}

export default ViewModal;