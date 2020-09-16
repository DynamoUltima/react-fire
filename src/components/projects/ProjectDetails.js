import React from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

const ProjectDetails = (props) => {

    // const id = props.match.params.id
    console.log(props);
    const { project, auth } = props;

    if (!auth.uid) return <Redirect to="/signin" />

    if (project) {
        return (
            <div className="container section project-list">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <div className="card-title">{project.title}</div>
                        <p>{project.content} </p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted By {project.authorFirstName} {project.authorLastName}</div>
                        <div>9th September 2020, 11am</div>
                    </div>
                </div>
            </div>
        );


    } else {
        return (
            <div className="container center">
                Project Loading...
            </div>
        );

    }

}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null //this checks for the presence of the project id (firestore doc id) and adds it to the project
    return {
        project: project,
        auth:state.firebase.auth
    }

}
// firebaseConnect(props => [
//     { collection : "projects", doc: props.match.params.id }
// ])
//this will fecth you the the specific project
export default compose(
    firestoreConnect(() => ['projects']),
    connect(mapStateToProps),
)(ProjectDetails);