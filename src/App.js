import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import LoginComponent from './Components/LoginComponent';
import UpComingClientVisitComponent from './Components/UpComingClientVisitComponent';
import AddProjectComponent from './Components/AddProjectComponent';
import ProjectDetailsComponent from './Components/ProjectDetailsComponent';
import CancelledVisitsComponent from './Components/CancelledVisitsComponent';
import EditProjectDetails from './Components/EditProjectDetailsComponent';
import AddClientComponent from './Components/AddClientComponent';
import ClientDetailsComponent from './Components/ClientDetailsComponent';
import EditClientDetails from './Components/EditClientDetailsComponent';
import ClientVisitDetails from './Components/ClientVisitDetailsComponent';
import AddClientVisitComponent from './Components/AddClientVisitComponent';
import AddProjectForVisitComponent from './Components/AddProjectForVisitComponent';
import EditClientVisitDetails from './Components/EditClientVisitComponent';
import CompletedVisitsComponent from './Components/CompletedVisitsComponent';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LoginComponent}></Route>
            <Route exact path="/upcomingclientvisit" component={UpComingClientVisitComponent}></Route>
            <Route exact path="/addClient" component={AddClientComponent}></Route>
            <Route exact path="/viewClientDetails" component={ClientDetailsComponent}></Route>
            <Route exact path="/editClientDetails/:clientId" component={EditClientDetails}></Route>
            <Route exact path="/addProject" component={AddProjectComponent}></Route>
            <Route exact path="/viewProjectDetails" component={ProjectDetailsComponent}></Route>
            <Route exact path="/editProjectDetails/:projectId" component={EditProjectDetails}></Route>
            <Route exact path="/viewClientVisitDetails" component={ClientVisitDetails}></Route>
            <Route exact path="/editClientVisitDetails/:visitId" component={EditClientVisitDetails}></Route>
            <Route exact path="/addClientVisitDetails" component={AddClientVisitComponent}></Route>
            <Route exact path="/:visitId/addProjectForVisit" component={AddProjectForVisitComponent}></Route>
            <Route exact path="/viewCancelledVisits" component={CancelledVisitsComponent}></Route>
            <Route exact path="/completedVisits" component={CompletedVisitsComponent}></Route>
    
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;