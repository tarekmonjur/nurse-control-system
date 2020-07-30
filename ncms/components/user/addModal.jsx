import React, {Component} from "react";
import {connect} from "react-redux";
import {Alert, Modal} from "../common";
import Form from "./form";
import userService from './../../src/services/user.service';
import {getData} from './../../store/actions';
import api from "../../store/api";

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.formData = {};
        this.state = {
            errors: {},
            modal: false,
            loading: false,
            modalId: "add-user-modal",
            response: null,
            user: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    open() {
        this.setState({ modal:true });
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    handleChange(formData) {
        this.formData = formData;
    }

    handleSubmit() {
        this.setState({ loading: true, response: null });
        const errors = userService.handleValidate(this.formData);

        if (!errors) {
            api.storeUser(this.formData)
                .then(result => {
                    this.setState({
                        loading: false,
                        errors: result.errors || {},
                        response: result,
                        modal: !!result.errors,
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
        const { errors, response, modal, modalId, user } = this.state;
        const {user_groups} = this.props;
        console.log({user});
        return (
            <div>
                { response &&
                    <Alert data={response} id="add-alert"/>
                }

                { modal &&
                    <Modal
                        id={modalId}
                        size="modal-lg"
                        icon="user.png"
                        title="Register New User"
                        button="Submit Registration Form"
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

export default connect(state=>state)(AddModal);