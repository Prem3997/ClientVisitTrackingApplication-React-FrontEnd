import React, { Component } from 'react';
import {Formik,Form,Field, ErrorMessage} from 'formik';
import ClientDataService from '../Service/ClientDataService';
import dxc from '../dxc.png';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'

class EditClientDetails extends Component {
    constructor(props) {
        super(props);
        this.state=({
            clientId:this.props.match.params.clientId,
            clientCompanyName: '',
            representativeName:'',
            location: '',
            emailAddress:'',
        })
this.validateProductForm=this.validateProductForm.bind(this);
this.onSubmit=this.onSubmit.bind(this);

    }
    componentWillMount()
    {
        ClientDataService.getClientById(this.state.clientId).then(response =>{
            this.setState({
                clientCompanyName:response.data.clientCompanyName,
                representativeName: response.data.representativeName,
                location:response.data.location,
                emailAddress:response.data.emailAddress
            })
        console.log(this.state.clientCompanyName)
        })
    }
  
    onSubmit(client){
        ClientDataService.editClientDetails(client).then(
            ()=> this.props.history.push(`/viewClientDetails`)
        )
    }

    validateProductForm(values){
        let errors = {}
        if (!values.clientId) {
            errors.clientId = 'Enter a Client Id'
        }
        else if (!values.clientCompanyName) {
            errors.clientCompanyName = 'Enter a Client CompanyName'
        }
        else if (!values.representativeName) {
            errors.representativeName = 'Enter a Representative Name'
        }
        else if (!values.location) {
            errors.location = 'Enter a Location'
        }
        else if (!values.emailAddress) {
            errors.emailAddress = 'Enter a Email Address'
        }
        return errors
    }
    render() {
        let{clientId,clientCompanyName,representativeName,location,emailAddress}=this.state

            return (
                <div>
                
                <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
                <Nav1></Nav1>
                <div className="bootstrap-iso">
                <div className='container'>
                    <br></br>
                    <div className="container col-md-4">
                    
                    <Formik
                        initialValues={{clientId,clientCompanyName,representativeName,location,emailAddress}}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validateProductForm}
                        >
                        <Form>
                            <ErrorMessage name="clientId" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="clientCompanyName" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="representativeName" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="location" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="emailAddress" component="div" className="alert alert-warning"/>

                            <fieldset className="form-group">
                                <label>ClientId</label>
                                <Field className="form-control" type="text" name="clientId" disabled/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Client CompanyName</label>
                                <Field className="form-control" type="text" name="clientCompanyName"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Representative Name</label>
                                <Field className="form-control" type="text" name="representativeName"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>location</label>
                                <Field className="form-control" type="text" name="location"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Email Address</label>
                                <Field className="form-control" type="text" name="emailAddress"/>
                            </fieldset>
                            <button className="btn btn-warning" type="submit" >Update</button>
                        </Form>
                    </Formik>
                    </div> 
                    </div>
                </div>
             </div>
            );
         
        
    }
    
}

export default EditClientDetails;