import React, {Component} from "react";
import {connect} from "react-redux";
import {isEmpty, isDate} from 'lodash';
import {Alert, Modal} from "../common";
import AddPatient from "../patient/add";
import patientService from './../../src/services/patient.service';
import patientApi from './../../store/patient';
import {getPatients} from './../../store/actions';

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
        // const errors = null;

        if (!errors) {
            await patientApi.addPatientApi(formData).then(result => {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        errors: result.errors || {},
                        response: result,
                        modal: !!result.errors,
                    });
                }, 1000);
            });
            await patientApi.getPatientsApi().then(result => {
                console.log({result});
                this.props.dispatch(getPatients(result));
            });

            // fetch(`${process.env.HOST}:${process.env.PORT}/api/patients`, {
            //     method: 'POST',
            //     body: JSON.stringify(formData),
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFyZWsiLCJtb2JpbGVfbm8iOiIiLCJlbWFpbCI6InRhcmVrQGdtYWlsLmNvbSIsImlkIjoiNWVjMzk0YjcxNDRmOTEyMzAwN2JlNzc2IiwiaWF0IjoxNTg5OTE4NDg5fQ.BNcNtGVA4kz5Ls6G3A598ovDdT95pkj4U-JlqSAgd8U'
            //     },
            //     json: true
            // })
            //     .then(response => response.json())
            //     .then(result => {
            //         await getPatients();
            //         setTimeout(() => {
            //             this.setState({
            //                 loading: false,
            //                 errors: result.errors || {},
            //                 response: result,
            //                 modal: !!result.errors,
            //             });
            //         }, 1000);
            //     });

        } else {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    errors: errors.errors,
                    response: errors,
                });
            }, 1000);
        }

    };

    render() {
        const {errors, response, date, modal, modalId} = this.state;
        return (
            <div>
                { response &&
                    <Alert data={response}/>
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
                        <AddPatient
                            formName={modalId}
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