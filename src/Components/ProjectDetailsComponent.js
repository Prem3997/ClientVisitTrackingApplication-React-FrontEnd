import React, { Component } from 'react';
import '../Styles/ProjectDetailsComponent.css'
import ProjectDataService from '../Service/ProjectDataService';
import '../bootstrap-iso.css'
import Nav1 from '../Nav1';
import dxc from '../dxc.png';

class ProjectDetails extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           projects: []
        }
        this.refreshProjectDetailsPage=this.refreshProjectDetailsPage.bind(this)
        this.deleteProjectClicked=this.deleteProjectClicked.bind(this)
        this.editProjectClicked=this.editProjectClicked.bind(this)
     }
         componentWillMount() {
            this.refreshProjectDetailsPage()
      }
      refreshProjectDetailsPage() {
         ProjectDataService.viewProjectDetails().then(response=>{
            console.log(response.data)
            this.setState({
               projects: response.data
            })
         })
      }
      deleteProjectClicked(projectIdTodelete){
         ProjectDataService.deleteProjectDetails(projectIdTodelete).then(response=>{
            this.refreshProjectDetailsPage()
         })
      }
         editProjectClicked(projectIdToUpdate){
            this.props.history.push(`/editProjectDetails/${projectIdToUpdate}`)
      }
    render() {
      return (
          <div>
              <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
              <Nav1></Nav1>
          <div className="bootstrap-iso">
              <div className='container'>
                  <h1><center>Project Details Page</center></h1>
                  {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                  <table className="table table-striped table-hover">
                      <thead>
                          <tr>
                              <th>ProjectId</th>
                              <th>ProjectName</th>
                              <th>ChapterToWhichBelongs</th>
                              <th>ProjectManager</th>
                              <th>ProjectVersion</th>
                              <th>ProjectStatus</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              this.state.projects.map(project =>
                                  <tr key={project.projectId}>
                                      <td>{project.projectId}</td>
                                      <td>{project.projectName}</td>
                                      <td>{project.chapterToWhichBelongs}</td>
                                      <td>{project.projectManager}</td>
                                      <td>{project.projectVersion}</td>
                                      <td>{project.projectStatus}</td>
                                      <div id="container" class="col-sm-6">
                                          <button className="btn btn-outline-warning btn-sm"  onClick={()=>this.editProjectClicked(project.projectId)}>Edit</button>
                                          <button className="btn btn-outline-danger btn-sm" onClick={()=>this.deleteProjectClicked(project.projectId)}>Delete</button>
                                       </div>
                                  </tr>
                              )
                          }
                      </tbody>
                  </table>
              </div>
          </div>
          </div>

      );
  }
}

export default ProjectDetails;