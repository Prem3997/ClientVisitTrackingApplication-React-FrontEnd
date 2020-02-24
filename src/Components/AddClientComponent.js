import React, { Component } from 'react';
import {Formik,Form,Field, ErrorMessage} from 'formik';
import ClientDataService from '../Service/ClientDataService';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'
import dxc from '../dxc.png';

class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            clientCompanyName: '',
            representativeName:'',
            location: '',
            mobileNumber: '',
            emailAddress:'',
            message:''
        }
        this.validateAddClientForm = this.validateAddClientForm.bind(this)  
        this.onSubmit=this.onSubmit.bind(this)   
    }
    onSubmit(client){
        console.log(client)
        ClientDataService.addClient(client).then(response=>{
            this.props.history.push("/upcomingclientvisit")
            console.log(response)
        })
        
    }
    validateAddClientForm(values){
        let errors={}
        if(!values.clientId)
        {
            errors.clientId='Enter a Client Id'
        }
        if(!values.clientCompanyName){
            errors.clientCompanyName='Enter a Client Company Name'
        }
        if(!values.representativeName){
            errors.representativeName='Enter a Representative Name'
        }
        if(!values.location){
            errors.location='Enter a Location'
        }
        if(!values.mobileNumber){
            errors.mobileNumber='Enter a Mobile Number'
        }
        if(!values.emailAddress){
            errors.emailAddress='Enter a Email Address'
        }
        if(values.mobileNumber.length!==10)
        {
            errors.mobileNumber='Mobile Number should be of 10 digit Number'
        }  
        return errors
    }
    render() {
        let{clientId,clientCompanyName,representativeName,location,mobileNumber,emailAddress}=this.state
        return (
            <div>
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
            <div className="bootstrap-iso">
            <div className='container'>          
                <div className="container col-md-4">
                <h2> Enter Client Details</h2>  
                {this.state.message && <div className='alert alert-danger'>{this.state.message}</div>}
                    <Formik
                        initialValues={{clientId,clientCompanyName,representativeName,location,mobileNumber,emailAddress}}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validateAddClientForm}>
                        <Form>
                        <fieldset className="form-group">
                            <label>Client Id</label>
                            <Field type="text" className="form-control" name="clientId" />
                        </fieldset>
                        <ErrorMessage name="clientId" component="div" className="alert alert-warning"/>
                        <fieldset className="form-group">
                            <label>Client Company Name</label>
                            <Field type="text" className="form-control" name="clientCompanyName" />
                        </fieldset>
                        <ErrorMessage name="clientCompanyName" component="div" className="alert alert-warning"/>
                        <fieldset className="form-group">
                            <label>Representative Name</label>
                            <Field type="text" className="form-control" name="representativeName" />         
                        </fieldset>
                        <ErrorMessage name="representativeName" component="div" className="alert alert-warning"/>     
                        <fieldset className="form-group">
                            <label>Location</label>
                            <Field type="text" className="form-control" name="location" />    
                        </fieldset>
                        <ErrorMessage name="location" component="div" className="alert alert-warning"/>           
                        <fieldset className="form-group">
                            <label>Mobile Number</label>
                            <Field type="text" className="form-control" name="mobileNumber" />            
                        </fieldset>
                        <ErrorMessage name="mobileNumber" component="div" className="alert alert-warning"/>                     
                        <fieldset className="form-group">
                            <label>Email Address</label>
                            <Field type="text" className="form-control" name="emailAddress" />                 
                        </fieldset>
                        <ErrorMessage name="emailAdress" component="div" className="alert alert-warning"/>

                        <button className="btn btn-info" type="submit" >Add</button>
                        </Form> 
                    </Formik>
                </div>
            </div>
            </div>
            </div>
        );
    }
    }
export default AddClient;