import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProjectDataService from '../Service/ProjectDataService';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'
import dxc from '../dxc.png';

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: '',
            projectName: '',
            chapterToWhichBelongs: '',
            projectManager: '',
            projectVersion: '',
            projectStatus: '',
            message: ''


        }
        //this.validateAddProjectForm = this.validateAddProjectForm.bind(this),
        this.onSubmit=this.onSubmit.bind(this);

    }
    onSubmit(project){
        console.log(project)
        ProjectDataService.addProject(project).then(response=>{
            this.props.history.push("/upcomingclientvisit");
            console.log(response);
        })
    }

    validateAddProjectForm(values) {
        let errors = {}
        if (!values.projectId) {
            errors.projectId = 'Enter a Project Id'
        }
        else if (!values.projectName) {
            errors.projectName = 'Enter a Project Name'
        }
        else if (!values.chapterToWhichBelongs) {
            errors.chapterToWhichBelongs = 'Enter Chapter To Which Belongs'
        }
        else if (!values.projectManager) {
            errors.projectManager = 'Enter a Project Manager'
        }
        else if (!values.projectVersion) {
            errors.projectVersion = 'Enter a Project Version'
        }
        else if (!values.projectStatus) {
            errors.projectStatus = 'Enter a Project Status'
        }


        return errors
    }
   

    render() {
        let { projectId, projectName, chapterToWhichBelongs, projectManager, projectStatus, projectVersion } = this.state

        return (
            <div>
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
            <div className="bootstrap-iso">

            <div className='container'>


                <div className="container col-md-4">
                    <h2> Enter Project details</h2>
                    {this.state.message && <div className='alert alert-danger'>{this.state.message}</div>}

                    <Formik
                        initialValues={{ projectId, projectName, chapterToWhichBelongs, projectManager, projectStatus, projectVersion }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validateAddProjectForm}>

                    <Form>
                            <ErrorMessage name="projectId" component="div" className="alert alert-warning" />
                            <ErrorMessage name="projectName" component="div" className="alert alert-warning" />
                            <ErrorMessage name="chapterToWhichBelongs" component="div" className="alert alert-warning" />
                            <ErrorMessage name="projectStatus" component="div" className="alert alert-warning" />
                            <ErrorMessage name="projectVersion" component="div" className="alert alert-warning" />
                            <ErrorMessage name="projectManager" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Project Id</label>

                                < Field type="text" className="form-control" name="projectId" />

                            </fieldset>

                            <fieldset className="form-group">
                                <label>Project Name</label>
                                <Field type="text" className="form-control" name="projectName" />


                            </fieldset>

                            <fieldset className="form-group">
                                <label>Chapter To Which Belongs</label>
                                <Field type="text" className="form-control" name="chapterToWhichBelongs" />


                            </fieldset>

                            <fieldset className="form-group">
                                <label>Project Manager</label>
                                <Field type="text" className="form-control" name="projectManager" />


                            </fieldset>

                            <fieldset className="form-group">
                                <label>Project Version</label>
                                <Field type="text" className="form-control" name="projectVersion" />


                            </fieldset>

                            <fieldset className="form-group">
                                <label>Project Status</label>
                                <Field type="text" className="form-control" name="projectStatus" />


                            </fieldset>
                            <button className="btn btn-info" type="submit" >Add</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default AddProject;