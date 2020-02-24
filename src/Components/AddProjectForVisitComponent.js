import React, { Component } from 'react';
import '../Styles/ProjectDetailsComponent.css'
import ProjectDataService from '../Service/ProjectDataService';
import ClientVisitDataService from '../Service/ClientVisitDataService';
import Nav1 from '../Nav1';
import dxc from '../dxc.png';

class AddProjectForVisit extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           projects: [],
           visitId:this.props.match.params.visitId
        }
        this.refreshProjectDetailsPage=this.refreshProjectDetailsPage.bind(this)
        this.addProjectClicked=this.addProjectClicked.bind(this)
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
      addProjectClicked(projectIdToAdd){
        console.log(projectIdToAdd)
        console.log(this.state.visitId)
        ClientVisitDataService.addProjectForVisit(this.state.visitId,projectIdToAdd).then(response=>{
            console.log(response)
        })
 }
    render() {
      return (
          <div>
              <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
              <Nav1></Nav1>
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
                                          <button className="btn btn-outline-warning btn-sm"  onClick={()=>this.addProjectClicked(project.projectId)}>Add</button>
                                          
                                       </div>
                                  </tr>
                              )
                          }
                      </tbody>
                  </table>
              </div>
          </div>

      );
  }
}

export default AddProjectForVisit;