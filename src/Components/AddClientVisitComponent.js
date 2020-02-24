import React, { Component } from 'react';
import { Formik,Form,Field, ErrorMessage } from 'formik';
import ClientDataService from '../Service/ClientDataService';
import ClientVisitDataService from '../Service/ClientVisitDataService';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'
import dxc from '../dxc.png';

class AddClientVisitComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitId: '',
            clients:[{clientId: '', clientCompanyName: '',representativeName:'', location: '', mobileNumber: '', emailAddress: '' }],
            dateOfVisit:''
        };
        this.refreshClientDetails=this.refreshClientDetails.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    onSubmit(clientVisit){
        console.log(clientVisit.dateOfVisit)
        var myVisit=new Date(clientVisit.dateOfVisit)
        myVisit=myVisit.getDate()+'-'+(myVisit.getMonth()+1)+'-'+myVisit.getFullYear()
        clientVisit.dateOfVisit=myVisit
        console.log(clientVisit.dateOfVisit)
        ClientVisitDataService.addClientVisit(clientVisit).then(response=>{
            this.props.history.push(`/${clientVisit.visitId}/addProjectForVisit`)
        })
    }
    componentWillMount(){
        this.refreshClientDetails()
    }
    refreshClientDetails(){
        ClientDataService.getAllClients().then(response=>{
            console.log(response.data)
            this.setState({
                clients:response.data
            })
        })
    }
    render() {
        let{visitId,clientId,dateOfVisit}=this.state
        return (
            <div >
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
                 <div className="bootstrap-iso">
                <div className="container col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className='wrapper'>
                                <div className='form-wrapper'>
                                
                                    <h2>Add Client Visit</h2>
                                    <Formik
                                    initialValues={{visitId,clientId,dateOfVisit}}
                                    enableReinitialize={true}
                                    onSubmit={this.onSubmit}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    validate={this.handleChange}
                                    >
                                    <Form>
                                    <fieldset className="form-group">
                                            <label>Visit Id</label>
                                            <Field type="text" className="form-control" name="visitId" />
                                        </fieldset>
                                        <ErrorMessage name="clientId" component="div" className="alert alert-warning"/>
                                        <fieldset className="form-group">
                                            <label>Client Name</label>
                                            <div className="center">
                                            <Field as="select" name="clientId" className="form-control">
                                                <option value="">Choose Client</option>
                                                {
                                                    this.state.clients.map(client=>
                    <option value={client.clientId}>{client.clientId}-{client.clientCompanyName}-{client.representativeName}</option>
                                                        )                             
                                                }
                                            </Field>
                                            </div>     
                                        </fieldset>   
                                        <fieldset className="form-group">
                                            <label>Date</label>
                                            <Field type="date" className="form-control" name="dateOfVisit" />
                                    
                                            {/* <Date ></Date> */}
                                        </fieldset>
                                        <fieldset className="form-group">
                                 <Field type="submit" value="Add" name="submit" className='btn btn-primary' />
                                </fieldset>
                                    </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default AddClientVisitComponent;