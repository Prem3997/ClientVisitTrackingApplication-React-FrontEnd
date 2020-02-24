import React, { Component } from 'react';
import ProjectDataService from '../Service/ProjectDataService';
import {Formik,Form,Field, ErrorMessage} from 'formik';
import dxc from '../dxc.png';
import Nav1 from '../Nav1';
import '../bootstrap-iso.css'
import ClientVisitDataService from '../Service/ClientVisitDataService';

class EditClientVisitDetails extends Component {
    constructor(props) {
        super(props);
        this.state=({
            visitId:this.props.match.params.visitId,
            clientCompanyName:'',
            dateOfVisit: ''
        })
this.validateProductForm=this.validateProductForm.bind(this);
this.onSubmit=this.onSubmit.bind(this);

    }
    componentWillMount()
    {
        ClientVisitDataService.getClientVisitdetail(this.state.visitId).then(response =>{
            this.setState({
                clientCompanyName:response.data.client.clientCompanyName,
                dateOfVisit:response.data.dateOfVisit
            })
        console.log(this.state.clientName)
        })
    }
  
    onSubmit(visit){
        var myVisit=new Date(visit.dateOfVisit)
        myVisit=myVisit.getDate()+'-'+(myVisit.getMonth()+1)+'-'+myVisit.getFullYear()
        visit.dateOfVisit=myVisit
        ClientVisitDataService.editClientVisitDetail(visit).then(
            ()=> this.props.history.push(`/upcomingclientvisit`)
        )
    }

    validateProductForm(values){
        let errors = {}
        if (!values.visitId) {
            errors.visitId = 'Enter a visit Id'
        }
        else if (!values.clientCompanyName) {
            errors.clientCompanyName = 'Enter a Client Company Name '
        }
        else if (!values.dateOfVisit) {
            errors.dateOfVisit = 'Enter a Date Of Visit '
        }
        return errors
    }
    render() {
        let{visitId,clientCompanyName,dateOfVisit}=this.state

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
                        initialValues={{visitId,clientCompanyName,dateOfVisit}}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validateProductForm}
                        >
                        <Form>
                            <ErrorMessage name="visitId" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="clientCompanyName" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="dateOfVisit" component="div" className="alert alert-warning"/>

                            <fieldset className="form-group">
                                <label>VisitId</label>
                                <Field className="form-control" type="text" name="visitId" disabled/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>ClientCompanyName</label>
                                <Field className="form-control" type="text" name="clientCompanyName"disabled/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>dateOfVisit</label>
                                <Field type="date" className="form-control" name="dateOfVisit"/>
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

export default EditClientVisitDetails;