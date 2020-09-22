import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  getResponse,
  getData,
  updateSettings, loader,
} from './../../store/actions';
import {
  ListTitle,
  Alert,
  Loading
} from './../common';
import {isDate, isEmpty} from "lodash";
import settingsService from "../../src/services/settings.service";


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      formName: 'settings',
    };
    this.errors = {};
    this.formData = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.props.getData({ columns: this.props.columns });
  }

  handleChange(event) {
    const stateData = {
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.name === 'logo' ? event.target.files[0] : event.target.value,
      },
    };
    this.formData = stateData.formData;
    this.setState(stateData);
  };

  handleSubmit() {
    this.props.loader(true);
    let data = this.formData;
    const errors = settingsService.handleValidate(data);

    if (!errors) {
      const form = new FormData();
      for(const key in data) {
        form.append(key, data[key]);
      }
      this.formData = {};
      this.props.updateSettings(form);
    } else {
      this.errors = errors;
      this.props.loader(false);
    }
  };

  render() {
    const { data, response, loading } = this.props;
    const errors = this.errors;
    const formData = Object.assign(data || {}, this.formData);
    this.formData = formData;

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
              <form name={this.state.formName} >
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name">Hospital Name : <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="name"
                        className={`form-control form-control-sm ${errors.name && 'is-invalid'}`}
                        name="name"
                        onChange={this.handleChange}
                        value={formData.name}
                        placeholder="Enter hospital name.."/>
                      {errors.name &&
                      <div className="invalid-feedback">{errors.name}</div>
                      }
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="title">Hospital Title Name : </label>
                      <input
                        type="text"
                        id="title"
                        className={`form-control form-control-sm ${errors.title && 'is-invalid'}`}
                        name="title"
                        onChange={this.handleChange}
                        value={formData.title}
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
                      <label htmlFor="hotline">Hospital Hotline Number : </label>
                      <input
                        type="text"
                        id="hotline"
                        className={`form-control form-control-sm ${errors.hotline && 'is-invalid'}`}
                        name="hotline"
                        onChange={this.handleChange}
                        value={formData.hotline}
                        placeholder="Enter hotline number.."/>
                      {errors.hotline &&
                      <div className="invalid-feedback">{errors.hotline}</div>
                      }
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="logo">Hospital Logo : </label>
                      <input
                        type="file"
                        id="logo"
                        className={`form-control form-control-sm ${errors.logo && 'is-invalid'}`}
                        name="logo"
                        onChange={this.handleChange}
                        placeholder="chose logo.."/>
                      {errors.logo &&
                      <div className="invalid-feedback">{errors.logo}</div>
                      }
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      {formData.logo ?
                        (<img src={`./uploads/${formData.logo}`} alt="" style={{width: '80px'}} />)
                        :
                        (<img src="./img/logo.png" alt="" style={{width: '80px'}} />)
                      }
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
                        onChange={this.handleChange}
                        value={formData.address}
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
                onClick={this.handleSubmit}
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

const actionCreators = {getResponse, getData, updateSettings, loader};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
