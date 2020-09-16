import React, { Component } from 'react';
import Notifications from './Notification.js';
import ProjectList from '../projects/ProjectList';
import { connect, } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom';


class Dashboard extends Component {
    // state={id:''}

    render() {
        const { projects, auth ,} = this.props;
        
        // this.setState({id:auth.uid})
        



        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)

    return {
        projects: state.firestore.ordered.projects || state.project.projects,
        auth: state.firebase.auth,
        user:state.firestore.ordered.users

    }

}
// firestoreConnect(props => {
//     // console.log("firestoreConnect props are the same that are passed to the component, ", props);
//   return [
//       { collection: "users", doc: props.match.params.id, storeAs: "user" }
//   ]
// }),

export default compose(
    firestoreConnect(() => ['projects']),
    firestoreConnect(() => ['users']),
    
    connect(mapStateToProps),

)(Dashboard);