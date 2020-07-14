import React, {Component} from "react";
import {connect} from "react-redux";
import {Alert, Modal} from "../common";
import Form from "./form";
import userService from './../../src/services/user.service';
import {getData} from './../../store/actions';
import api from "../../store/api";

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.formData = {};
        this.state = {
            errors: {},
            modal: false,
            loading: false,
            modalId: "edit-user-modal",
            response: null,
            user: {},
        };
        this.id = null;
        this.open = this.open.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async open(id) {
        this.id = id;
        const result = await api.showUser(id);
        if (result.status === 'error') {
            this.setState({ response: result });
        } else {
            this.formData = result.results;
            this.setState({ modal: true, user: result.results });
        }
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    handleChange(formData) {
        this.formData = formData;
    }

    async handleSubmit() {
        this.setState({ loading: true, response: null });
        const errors = userService.handleValidate(this.formData, true);
        console.log({errors});
        if (!errors) {
            api.updateUser(this.id, this.formData)
                .then(result => {
                    this.setState({
                        loading: false,
                        errors: result.errors || {},
                        response: result,
                        modal: !!result.errors,
                        formData: {},
                    });
                    if (result.status !== 'error') {
                        this.props.dispatch(getData({ columns: this.props.columns }));
                    }
            });
        } else {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    errors: errors.errors,
                    response: errors,
                });
            }, 200)
        }

    };

    render() {
        const {errors, response, modal, modalId, user} = this.state;
        const {user_groups} = this.props;
        return (
            <div>
                { response &&
                    <Alert data={response} id="edit-alert"/>
                }

                { modal &&
                    <Modal
                        id={modalId}
                        size="modal-lg"
                        icon="user.png"
                        title="Edit User"
                        button="Submit User Form"
                        loading={this.state.loading}
                        onClose={() => {
                            this.setState({
                                modal: false,
                                errors: false,
                                response: null,
                            });
                        }}
                        onSubmit={() => {
                            this.handleSubmit();
                        }}>
                        <Form
                            formName={modalId}
                            user_groups={user_groups}
                            info={user}
                            errors={errors}
                            handleChange={this.handleChange} />
                    </Modal>
                }
            </div>
        );
    }
}

export default connect(state=>state)(EditModal);