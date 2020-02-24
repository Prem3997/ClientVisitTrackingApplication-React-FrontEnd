import React, { Component } from 'react';
import ProjectDataService from '../Service/ProjectDataService';
import {Formik,Form,Field, ErrorMessage} from 'formik';
import dxc from '../dxc.png';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'

class EditProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state=({
            projectId:this.props.match.params.projectId,
            projectName: '',
            chapterToWhichBelongs:'',
            projectManager:'',
            projectVersion: '',
            projectStatus:'',
        })
this.validateProductForm=this.validateProductForm.bind(this);
this.onSubmit=this.onSubmit.bind(this);

    }
    componentWillMount()
    {
        ProjectDataService.getProjectById(this.state.projectId).then(response =>{
            this.setState({
                projectName: response.data.projectName,
                chapterToWhichBelongs:response.data.chapterToWhichBelongs,
                projectManager:response.data.projectManager,
                projectVersion: response.data.projectVersion,
                projectStatus:response.data.projectStatus
            })
        console.log(this.state.projectName)
        })
    }
  
    onSubmit(project){
        ProjectDataService.editProjectDetails(project).then(
            ()=> this.props.history.push(`/viewProjectDetails`)
        )
    }

    validateProductForm(values){
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
        let{projectId,projectName,chapterToWhichBelongs,projectManager,projectVersion,projectStatus}=this.state

            return (
                <div>
                    
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
                <div className="bootstrap-iso">
                <div className='container'>
                    <br></br>
                    <div className="container col-md-4">
                    
                    <Formik
                        initialValues={{projectId,projectName,chapterToWhichBelongs,projectManager,projectVersion,projectStatus}}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validateProductForm}
                        >
                        <Form>
                            <ErrorMessage name="projectId" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="projectName" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="chapterToWhichBelongs" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="projectManager" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="projectVersion" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="projectStatus" component="div" className="alert alert-warning"/>

                            <fieldset className="form-group">
                                <label>ProjectId</label>
                                <Field className="form-control" type="text" name="projectId" disabled/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>ProjectName</label>
                                <Field className="form-control" type="text" name="projectName"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Chapter</label>
                                <Field className="form-control" type="text" name="chapterToWhichBelongs"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>ProjectManager</label>
                                <Field className="form-control" type="text" name="projectManager"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>ProjectVersion</label>
                                <Field className="form-control" type="text" name="projectVersion"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>projectStatus</label>
                                <Field className="form-control" type="text" name="projectStatus"/>
                            </fieldset>
                            <button className="btn btn-warning" type="submit" >Update</button>
                        </Form>
                    </Formik>
                    </div> 
                </div>
                </div>
             </div>
            );
         
        
    }
    
}

export default EditProjectDetails;