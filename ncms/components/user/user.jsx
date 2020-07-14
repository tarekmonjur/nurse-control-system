import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
    getResponse,
    getData,
    deleteData
} from './../../store/actions';
import Filter from './filter';
import AddModal from './addModal';
import EditModal from './editModal';
import ViewModal from './viewModal';
import {
    Table,
    Paginate,
    ListTitle,
    AddButton,
    FilterButton,
    PdfButton,
    ExcelButton,
    Alert
} from './../common';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = { response: null };
        this.onDelete = this.onDelete.bind(this);
    }

    async componentDidMount() {
        this.props.getData({ columns: this.props.columns });
    }

    onDelete(id) {
        this.props.deleteData(id);
        this.props.getData({ columns: this.props.columns });
    }

    render() {
        const { data, response } = this.props;
        console.log('user..');
        return (
            <div className="row">
                {this.props.children}
                <div className="col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <ListTitle
                                    title="Users List"
                                    icon="administrator.png"
                                />
                                <ExcelButton />
                                <PdfButton />
                                <FilterButton />
                                <AddButton
                                    title="Register New User"
                                    onclick={() => {
                                        this.addModal.open()
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-body"
                             style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                            <Filter />
                            {data &&
                                <Table
                                    data={data}
                                    onEdit={this.editModal.open}
                                    onView={this.viewModal.onView}
                                    onDelete={this.onDelete}
                                />
                            }
                        </div>
                        <div className="card-footer">
                            <Paginate />
                        </div>
                    </div>
                </div>
                <AddModal setChild={(child) => this.addModal = child} />
                <EditModal setChild={(child) => this.editModal = child} />
                <ViewModal setChild={(child) => this.viewModal = child}/>
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

const actionCreators = {getResponse, getData, deleteData};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
