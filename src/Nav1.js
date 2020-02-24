import React, { Component } from 'react';
import './Nav1.css'
import {Redirect} from 'react-router-dom'
import './bootstrap-iso.css'
class Nav1 extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token")
        let loggedIn = true

        if (token == null) {
            loggedIn = false
        }
        this.state = {
          loggedIn
        }
        this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit() {
    localStorage.clear()
    // this.props.history.push("/")
    window.location.href="/"
  }
  
  render(){
    if (this.state.loggedIn === false) {
      return <Redirect to="/"></Redirect>
    }
    return(
    <div>
  <ul>
  <li><a class="active" href="/upcomingclientvisit">Home</a></li>
  <li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Add</a>
    <div class="dropdown-content">
      <a href="/addClient">Add Client</a>
      <a href="/addProject">Add Project</a>
      <a href="/addClientVisitDetails">Add Client Visit</a>
    </div>
  </li>
  <li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Details</a>
    <div class="dropdown-content">
      <a href="/viewClientDetails">Client Details</a>
      <a href="/viewProjectDetails">Project Details</a>
      <a href="/viewClientVisitDetails">Client Visit Details</a>
    </div>
    
  </li>
  
  <li><a href="/completedVisits">Completed Visits</a></li>
  <li><a href="/viewCancelledVisits">Cancelled Visits</a></li>
  <li style={{float:"right"}}><button className="btn btn-success" onClick={() => this.handleSubmit()} >logout</button></li>
</ul>
  </div>
  )
}
}
export default Nav1;