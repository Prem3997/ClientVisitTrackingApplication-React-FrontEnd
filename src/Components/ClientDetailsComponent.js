import React, { Component } from 'react';
import ClientDataService from '../Service/ClientDataService';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'
import dxc from '../dxc.png';

class ClientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            clients: [],
            message: ''
        })
        this.refreshClientDetailsPage = this.refreshClientDetailsPage.bind(this)
        
    }
    componentWillMount() {
        this.refreshClientDetailsPage()
    }
    refreshClientDetailsPage() {
        ClientDataService.getAllClients().then(response => {
            console.log(response.data)
            this.setState({
                clients: response.data
            })
        })
    }
    editClientClicked(clientIdToUpdate){
        this.props.history.push(`/editClientDetails/${clientIdToUpdate}`)
    }
    deleteClientClicked(clientIdToDelete){
        ClientDataService.deleteClientDetails(clientIdToDelete).then(response=>{
            this.refreshClientDetailsPage()
    })
    }
    render() {
        return (
                <div >
                    <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
                 <div className="bootstrap-iso">                
                 <div className='container'>
                    <h1><center>Client Details Page</center></h1>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ClientId</th>
                                <th>ClientCompanyName</th>
                                <th>Representative Name</th>
                                <th>Location</th>
                                <th>EmailAddress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clients.map(client =>
                                    <tr key={client.clientId}>
                                        <td>{client.clientId}</td>
                                        <td>{client.clientCompanyName}</td>
                                        <td>{client.representativeName}</td>
                                        <td>{client.location}</td>
                                        <td>{client.emailAddress}</td>
                                        <div id="container" class="col-sm-6" >
                                        <button className="btn btn-outline-warning btn-sm" onClick={() => this.editClientClicked(client.clientId)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => this.deleteClientClicked(client.clientId)}>Delete</button>
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

export default ClientDetails;