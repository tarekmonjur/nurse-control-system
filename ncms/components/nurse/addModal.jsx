import React, {Component} from "react";
import {connect} from "react-redux";
import {isEmpty, isDate} from 'lodash';
import {Alert, Modal} from "../common";
import Form from "./form";
import nurseService from './../../src/services/nurse.service';
import {getData} from './../../store/actions';
import api from "../../store/api";

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            date: new Date(),
            errors: {},
            modal: false,
            loading: false,
            modalId: "add-nurse-modal",
            response: null,
            info: {},
        };
    }

    init() {
        let formData = {};
        const form = document.querySelector(`form[name="${this.state.modalId}"]`);
        for (let i = 0; i < form.elements.length; i++) {
            if (!isEmpty(form.elements[i].name)) {
                formData[form.elements[i].name] = form.elements[i].value;
            }
        }
        this.setState({ formData });
    }

    open() {
        this.setState({ modal:true });
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    handleChange = (event) => {
        let stateData = {};
        if (isDate(event)) {
            stateData = {
                formData: {
                    ...this.state.formData,
                    joining_date : event.toISOString().split('T')[0],
                },
                date: event,
            };
        } else {
            stateData = {
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value,
                },
            };
        }
        this.setState(stateData);
    };

    async handleSubmit() {
        this.setState({ loading: true, response: null });
        const formData = this.state.formData;
        const errors = nurseService.handleValidate(formData);

        if (!errors) {
            api.storeNurse(formData)
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
        const { errors, response, modal, modalId, info, date } = this.state;
        return (
            <div>
                { response &&
                    <Alert data={response} id="add-alert"/>
                }

                { modal &&
                    <Modal
                        id={modalId}
                        size="modal-lg"
                        icon="nurse-03.png"
                        title="Register New Nurse"
                        button="Submit Registration Form"
                        loading={this.state.loading}
                        onClose={() => {
                            this.setState({
                                modal: false,
                                errors: false,
                                response: null
                            });
                        }}
                        onSubmit={() => {
                            this.handleSubmit();
                        }}>
                        <Form
                            formName={modalId}
                            info={info}
                            date={date}
                            errors={errors}
                            init={() => { this.init() }}
                            handleChange={this.handleChange} />
                    </Modal>
                }
            </div>
        );
    }
}

export default connect(state=>state)(AddModal);