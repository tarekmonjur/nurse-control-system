import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  getResponse,
  getData,
} from './../../store/actions';
import {
  ListTitle,
  Alert,
  Loading
} from './../common';
import {isDate, isEmpty} from "lodash";
import userService from "../../src/services/user.service";
import api from "../../store/api";


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      formData: {},
      errors: {},
      response: null,
      formName: 'settings',
      loading: false,
    };
  }

  init() {
    let formData = {};
    const form = document.querySelector(`form[name="${this.state.formName}"]`);
    for (let i = 0; i < form.elements.length; i++) {
      if (!isEmpty(form.elements[i].name)) {
        if (form.elements[i].type === 'radio') {
          if (form.elements[i].checked)
            formData[form.elements[i].name] = form.elements[i].value;
        } else {
          formData[form.elements[i].name] = form.elements[i].value;
        }
      }
    }
    this.setState({formData: formData});
  }

  async componentDidMount() {
    this.props.getData({ columns: this.props.columns });
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

  handleChange(event) {
    // let stateData = {};
    // if (isDate(event)) {
    //   stateData = {
    //     formData: {
    //       ...this.state.formData,
    //       joining : event.toISOString().split('T')[0],
    //     },
    //     date: event,
    //   };
    // } else {
    //   stateData = {
    //     formData: {
    //       ...this.state.formData,
    //       [event.target.name]: event.target.value,
    //     },
    //   };
    // }
    // this.props.handleChange(stateData.formData);
    // this.setState(stateData);
  };

  render() {
    const { data, response } = this.props;
    console.log('settings..', {data});
    let {formData, errors, loading } = this.state;
    formData = Object.assign(formData, data);

    return (
      <div className="row">
        {this.props.children}
        <div className="col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex">
                <ListTitle
                  title="Settings"
                  icon="gear.png"
                />
              </div>
            </div>
            <div className="card-body"
                 style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
              <form name="settings">
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name">Hospital Name : <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="name"
                        className={`form-control form-control-sm ${errors.name && 'is-invalid'}`}
                        name="name"
                        value={formData.name}
                        onChange={this.handleChange}
                        placeholder="Enter hospital name.."/>
                      {errors.name &&
                      <div className="invalid-feedback">{errors.name}</div>
                      }
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name">Hospital Title Name : </label>
                      <input
                        type="text"
                        id="title"
                        className={`form-control form-control-sm ${errors.title && 'is-invalid'}`}
                        name="name"
                        value={formData.title}
                        onChange={this.handleChange}
                        placeholder="Enter hospital title.."/>
                      {errors.title &&
                      <div className="invalid-feedback">{errors.title}</div>
                      }
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name">Hospital Hotline Number : </label>
                      <input
                        type="text"
                        id="hotline"
                        className={`form-control form-control-sm ${errors.hotline && 'is-invalid'}`}
                        name="hotline"
                        value={formData.hotline}
                        onChange={this.handleChange}
                        placeholder="Enter hotline number.."/>
                      {errors.hotline &&
                      <div className="invalid-feedback">{errors.hotline}</div>
                      }
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name">Hospital Logo : </label>
                      <input
                        type="file"
                        id="logo"
                        className={`form-control form-control-sm ${errors.logo && 'is-invalid'}`}
                        name="logo"
                        value={formData.logo}
                        onChange={this.handleChange}
                        placeholder="chose logo.."/>
                      {errors.logo &&
                      <div className="invalid-feedback">{errors.logo}</div>
                      }
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      logo
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="address">Hospital Address :</label>
                      <textarea
                        id="address"
                        className={`form-control form-control-sm ${errors.address && 'is-invalid'}`}
                        name="address"
                        value={formData.address}
                        onChange={this.handleChange}
                        placeholder="Enter hospital address..."/>
                      {errors.address &&
                      <div className="invalid-feedback">{errors.address}</div>
                      }
                    </div>
                  </div>
                </div>

              </form>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                onClick={this.props}
                className="btn btn-sm btn-primary col-2"
                disabled={loading} >
                {loading ?
                  <Loading col="col-4" /> :
                  "Save Settings"
                }
              </button>
            </div>
          </div>
        </div>
        { response &&
        <Alert data={response} id="alert"/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {...state, ...ownProps};
};

const actionCreators = {getResponse, getData};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
