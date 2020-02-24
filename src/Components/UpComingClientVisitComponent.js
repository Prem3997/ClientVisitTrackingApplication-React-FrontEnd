import React, { Component } from 'react';
import UpComingClientVisitService from '../Service/UpComingClientVisitService';
import Popup from "reactjs-popup"
// import '../general.css'
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'
import dxc from '../dxc.png';
import {Icon} from '@opuscapita/react-icons'
import ClientVisitDataService from '../Service/ClientVisitDataService';

class ClientVisitPage extends Component {
    constructor(props) {
        super(props); 
        this.state = ({
            clientVisits: [],
            message: ''
        })
        
        this.refreshUpComingClientVisitPage = this.refreshUpComingClientVisitPage.bind(this)

    }
    componentWillMount() {
        this.refreshUpComingClientVisitPage()
    }
    refreshUpComingClientVisitPage() {
        UpComingClientVisitService.getUpComingVisit().then(response => {
            console.log(response.data)
            this.setState({
                clientVisits: response.data
            })
            
        })
    }
    deleteVisitClicked(visitId){
        console.log(visitId)
        ClientVisitDataService.deleteClientVisits(visitId).then(response=>{
            this.refreshUpComingClientVisitPage()
        })
        
    }
    editButtonclicked(visitId){
        console.log(visitId)
        this.props.history.push(`/editClientVisitDetails/${visitId}`)
    }
    render() {
        return (
            <div>
                
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
            <div className="bootstrap-iso">
            
                <div className='container'>
                    <h1><center>Upcoming Client Visits</center></h1>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Client Company Name</th>
                                <th>Representative Name</th>
                                <th>Date Of Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clientVisits.map(clientVisit =>
                                    <tr key={clientVisit.visitId}>
                                        <td>{clientVisit.client.clientCompanyName}</td>
                                        <td>{clientVisit.client.representativeName}</td>
                                        <td>{clientVisit.dateOfVisit}</td>
                                        
                                        <td>
                                        <Icon type="indicator" name="edit" onClick={() => this.editButtonclicked(clientVisit.visitId)}/>
                                        </td>
                                        
                                         <td><Popup
                                            trigger={<Icon type="indicator" name="delete" />}
                                            modal
                                            closeOnDocumentClick={true}
                                            >
                                                <div>Are you sure,you want to delete the client?</div><br></br>
                                            <button onClick={() => this.deleteVisitClicked(clientVisit.visitId)}>Yes</button>
                                            {close=>(
                                                <div>
                                                <button onClick={close}>No</button>
                                                </div>
                                            )}
                                            
                                            
                                        </Popup></td>

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

export default ClientVisitPage;