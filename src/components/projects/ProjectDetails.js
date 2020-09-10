import React from 'react';

const ProjectDetails = (props) => {

    const id = props.match.params.id
    return (
        <div className="container section project-list">
            <div className="card z-depth-0">
                <div className="card-content">
                    <div className="card-title">Project Title - {id}</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted By Dynamo</div>
                    <div>9th September 2020, 11am</div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;