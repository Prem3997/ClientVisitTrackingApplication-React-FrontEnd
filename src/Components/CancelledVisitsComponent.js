import React, { Component } from 'react';
import ClientVisitDataService from '../Service/ClientVisitDataService';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'
import dxc from '../dxc.png';

class CancelledVisits extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            clientVisits: []
        })
    }
    componentWillMount() {
        this.refreshCancelledVisitPage()
    }
    refreshCancelledVisitPage() {
        ClientVisitDataService.viewCancelledVisits().then(response => {
            console.log(response.data)
            this.setState({
                clientVisits: response.data
            })
        })
    }
    render() {
        return (
            <div>
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
                <div className="bootstrap-iso">

                 <div className='container'>
                    <h1><center>Cancelled Visits</center></h1>
                   
                    
                    {/* {this.state.message && <div className='alert alert-success'>{this.state.message}</div>} */}
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ClientCompanyName</th>
                                <th>Projects</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                             {
                                this.state.clientVisits.map(clientVisit =>
                                    <tr key={clientVisit.visitId}>
                                        <td>{clientVisit.client.clientCompanyName}</td>
                                        <td>{clientVisit.projectToVisit.map(project=>
                                            <tr>{project.projectName}</tr>
                                        )}
                                        </td>

                                        <td>{clientVisit.dateOfVisit}</td>
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

export default CancelledVisits;