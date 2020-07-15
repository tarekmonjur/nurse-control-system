
import React, {Component} from 'react';
import { connect } from 'react-redux';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            appName: process.env.APP_NAME,
        }
    }

    render() {
        console.log('home state: ', this.state);
        const { user } = this.state;
        return (
            <div className='row'>
                <div className="col-md-12">
                    <h1 className='text-dark'>{this.state.title}</h1>
                    <div className="jumbotron">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="font-weight-bold">Full Name : </td>
                                    <td>{user.fname} {user.lname}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Email : </td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Mobile : </td>
                                    <td>{user.mobile_no}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return state})(Home);
