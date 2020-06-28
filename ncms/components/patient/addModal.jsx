import React, {Component} from "react";
import {connect} from "react-redux";
import {isEmpty, isDate} from 'lodash';
import {Alert, Modal} from "../common";
import Form from "./form";
import patientService from './../../src/services/patient.service';
import {getPatients} from './../../store/actions';
import api from "../../store/api";

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            errors: {},
            date: new Date(),
            modal: false,
            loading: false,
            modalId: "add-patient-modal",
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
        this.setState({formData});
    }

    open() {
        this.setState({modal:true});
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
                    admitted_date : event.toISOString().split('T')[0],
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
        this.setState({loading: true, response: null});
        const formData = this.state.formData;
        const errors = patientService.handleValidate(formData);

        if (!errors) {
            api.storePatient(formData)
                .then(result => {
                    this.setState({
                        loading: false,
                        errors: result.errors || {},
                        response: result,
                        modal: !!result.errors,
                    });
                    if (result.status !== 'error') {
                        api.getPatients({columns: this.props.columns})
                            .then(result => {
                                this.props.dispatch(getPatients(result));
                            });
                    }
            });
        } else {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    errors: errors.errors,
                    response: errors,
                });
            }, 300)
        }

    };

    render() {
        const {errors, response, date, modal, modalId, info} = this.state;
        return (
            <div>
                { response &&
                    <Alert data={response} id="add-alert"/>
                }

                { modal &&
                    <Modal
                        id={modalId}
                        size="modal-lg"
                        icon="bed-04.png"
                        title="Admit New Patient"
                        button="Submit Admitted Form"
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
                            errors={errors}
                            date={date}
                            init={() => { this.init() }}
                            handleChange={this.handleChange} />
                    </Modal>
                }
            </div>
        );
    }
}

export default connect(state=>state)(AddModal);