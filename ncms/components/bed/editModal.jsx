import React, {Component} from "react";
import {connect} from "react-redux";
import {isEmpty, isDate} from 'lodash';
import {Alert, Modal} from "../common";
import Form from "./form";
import bedService from './../../src/services/bed.service';
import {getData} from './../../store/actions';
import api from "../../store/api";

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            errors: {},
            modal: false,
            loading: false,
            modalId: "edit-bed-modal",
            response: null,
            bed: {},
        };
        this.id = null;
        this.open = this.open.bind(this);
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

    open(id) {
        this.id = id;
        api.showBed(id).then(result => {
            if (result.status === 'error') {
                this.setState({ response: result });
            } else {
                this.setState({ modal:true, bed: result.results });
            }
        });
    }

    componentDidMount() {
        this.props.setChild(this);
    }

    handleChange = (event) => {
        const stateData = {
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value,
            },
        };
        this.setState(stateData);
    };

    async handleSubmit() {
        this.setState({ loading: true, response: null });
        const formData = this.state.formData;
        const errors = bedService.handleValidate(formData);

        if (!errors) {
            console.log({formData});
            api.updateBed(this.id, formData)
                .then(result => {
                    this.setState({
                        loading: false,
                        errors: result.errors || {},
                        response: result,
                        modal: !!result.errors,
                        formData: result.errors ? this.formData : {},
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
        const {errors, response, modal, modalId, bed, formData} = this.state;
        const data = Object.assign(bed, formData);
        return (
            <div>
                { response &&
                    <Alert data={response} id="edit-alert"/>
                }

                { modal &&
                    <Modal
                        id={modalId}
                        size="modal-lg"
                        icon="bed-03.png"
                        title="Edit Bed & Device"
                        button="Submit Bed & Device Form"
                        loading={this.state.loading}
                        onClose={() => {
                            this.setState({
                                modal: false,
                                errors: false,
                                response: null,
                                formData: {},
                            });
                        }}
                        onSubmit={() => {
                            this.handleSubmit();
                        }}>
                        <Form
                            formName={modalId}
                            info={data}
                            errors={errors}
                            init={() => { this.init() }}
                            handleChange={this.handleChange} />
                    </Modal>
                }
            </div>
        );
    }
}

export default connect(state=>state)(EditModal);