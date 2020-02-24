import React, { Component } from 'react';
import '../App.css';
import ClientVisitDataService from '../Service/ClientVisitDataService';
import '../bootstrap-iso.css'
import dxc from '../dxc.png';

import Nav1 from '../Nav1';
class ClientVisitDetails extends Component {
    constructor(props) {
        super(props);
        this.refreshClientVisit = this.refreshClientVisit.bind(this);
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
        this.updateButtonClicked = this.updateButtonClicked.bind(this);
        this.addButtonClicked = this.addButtonClicked.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
        this.state = ({
            clientVisits: [],
            message: ''
        })
    }

    componentWillMount() {
        this.refreshClientVisit();
    }
    refreshClientVisit() {

        ClientVisitDataService.viewCompletedVisits().then(
            response => {
                this.setState({
                    clientVisits: response.data
                })

            }

        )
    }
    deleteButtonClicked(productIdToDelete) {
        // ProductDataService.deleteProduct(productIdToDelete).then(
        //     response => {
        //         this.setState({
        //             message: 'productId :' + productIdToDelete + ' deleted successfully'
        //         })
        //         this.refreshProduct();
        //     }

        // )

    }
    updateButtonClicked(productIdToUpdate) {
        // this.props.history.push(`/products/${productIdToUpdate}`)
    }
    addButtonClicked() {
        // var productIdToAdd = -1
        // this.props.history.push(`/products/${productIdToAdd}`)
    }
    searchButtonClicked() {

        //this.props.history.push(`/productsearch`)

    }
    addReviewClicked(productId)
    {
        // var reviewId=-1
        // this.props.history.push(`/${productId}/reviews/${reviewId}`);
    }
    deleteReviewClicked(productId, reviewId)
    {
        // ProductDataService.deleteReview(productId, reviewId).then(response => {
        //   this.setState({
        //     message: "Review Deleted Successfully"
        //   });
        //   this.refreshProduct();
        // });
    }
    updateReviewClicked(visitId, projectId)
    {
        // console.log(visitId);
        // console.log(projectId);
        // this.props.history.push(`/${visitId}/reviews/${projectId}`);
    }
    render() {
        return (
            <div>
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
            <div className="bootstrap-iso">

                <div className="container">
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <h3>All Client Visits</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>VisitId</th>
                                    <th>DateOfVisit</th>
                                    <th>Client</th>
                                    {/* list of projects */}
                                    <th>ProjectToVisit</th> 
                                    {/* list of feedbacks */}
                                    <th>ClientFeedbacks</th> 

                                    <th>Actions</th>
                                    

                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.clientVisits.map(clientVisit =>
                                        <tr key={clientVisit.visitId}>
                                            <td>{clientVisit.visitId}</td>
                                            <td>{clientVisit.dateOfVisit}</td>
                                            <td id="client"><tr>ClientId:{clientVisit.client.clientId}</tr>
                                                <tr>CompanyName:{clientVisit.client.clientCompanyName}</tr>
                                                <tr>RepresentativeName:{clientVisit.client.representativeName}</tr>
                                                <tr>Location:{clientVisit.client.location}</tr>
                                                <tr>Contact No:{clientVisit.client.mobileNumber}</tr>
                                                <tr>Email:{clientVisit.client.emailAddress}</tr>

                                            </td>
                                            <td>{clientVisit.projectToVisit.map(project => (
                                                <tr id="project">
                                                    <tr>ProjectName:{project.projectName}</tr>
                                                    <tr>ChapterName:{project.chapterToWhichBelongs}</tr>
                                                    <tr>ProjectManager:{project.projectManager}</tr>
                                                    <tr>ProjectVersion:{project.projectVersion}</tr>
                                                    <tr>ProjectStatus:{project.projectStatus}</tr>
                                                     <tr>_______________________________</tr>                               
                                                </tr>
                                            ))}

                                            </td>
                                            <td>{clientVisit.clientFeedbacks.map(clientFeedback => (
                                                <tr id="client">
                                                    <tr>FeedBackId:{clientFeedback.feedBackId}</tr>
                                                    <tr>Expectation:{clientFeedback.expectation}</tr>
                                                    <tr>improvement:{clientFeedback.improvement}</tr>
                                                    
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-warning btn-sm"
                                                            onClick={() =>
                                                                this.updateReviewClicked(
                                                                    clientVisit.visitId,
                                                                    clientFeedback.feedBackId
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                   
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                this.deleteReviewClicked(
                                                                    clientVisit.visitId,
                                                                    clientFeedback.feedBackId
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                                <tr>
                                                    <button
                                                        className="btn btn-outline-info btn-sm"
                                                        onClick={() =>
                                                            this.addReviewClicked(clientVisit.visitId,)
                                                        }
                                                    >
                                                        Add New feedback
                                                    </button>
                                                </tr>
                                            </td>
                                            <div class="button">
                                            <td ><button className="btn btn-outline-warning" onClick={() => this.updateButtonClicked(clientVisit.visitId)}>Edit</button>
                                            <button className="btn btn-outline-danger" onClick={() => this.deleteButtonClicked(clientVisit.visitId)}>Delete</button>
                                            </td>
                                            </div>
                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            </div>

        );
    }
}

export default ClientVisitDetails;