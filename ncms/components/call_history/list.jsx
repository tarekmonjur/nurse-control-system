import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getData,
} from './../../store/actions';
import Filter from "./filter";
import {
    Table,
    Paginate,
    ListTitle,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../common';


class List extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = { response: null }
    }

    async componentDidMount() {
        this.props.getData({ columns: this.props.columns });
    }

    render() {
        const { data, response } = this.props;
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <ListTitle
                                    title="Call History List"
                                    icon="present-call.png"
                                />
                                <ExcelButton />
                                <PdfButton />
                                <FilterButton />
                            </div>
                        </div>
                        <div className="card-body"
                             style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                            <Filter />
                            {data &&
                                <Table
                                    data={data}
                                />
                            }
                        </div>
                        <div className="card-footer">
                            <Paginate />
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
