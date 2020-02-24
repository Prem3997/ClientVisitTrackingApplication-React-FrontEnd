import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
// import '../Styles/LoginComponent.css'
import '../App.css'
import UserDataService from '../Service/UserDataService';
import dxc from '../dxc.png';
import '../bootstrap-iso.css'
class Login extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        let loggedIn = true

        if (token == null) {
            loggedIn = false
        }
        this.state = {
            userName: '',
            password: '',
            errorUserName: '',
            errorPassword: '',
            loggedIn
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ errorUserName: '',
    errorPassword: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        // const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if (!this.state.userName) {
            return this.setState({ errorUserName: 'Username is required' });
        }
        else if (!this.state.password) {
            return this.setState({ errorPassword: 'Password is required' });
        }
        else{
            UserDataService.isValidUser(this.state.userName,this.state.password).then(response=>{
                console.log(response.status)
                if(response.status===200){
                    console.log("Success")
                    this.props.history.push("/upcomingclientvisit")
                    
                }
                else{
                    console.log("Enter Valid User")
                    this.props.history.push("/")
                }
            })
            localStorage.setItem("token", "jksafhjksdhfksdjf")
        }
        // if( validEmailRegex.test(this.state.userName)){
        //     return this.setState({ errorUserName: 'Username is invalid' });
        // }
        if(this.state.password.length<5){
            return this.setState({errorPassword:'Password must be minimum 6 characters long!'});
        }

        return this.setState({ 
            errorUserName: '',
            errorPassword: '' });
    }
    handleUserNameChange(evt) {
        this.setState({
            userName: evt.target.value,
        });
    };
    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }
    render() { 
        
        if (this.state.loggedIn) {
            return <Redirect to="/upcomingclientvisit"></Redirect>
        }
        return (
            <div className="bootstrap-iso">
                 <img src={dxc} class="logo"></img>
                 <b>DXC Client Visit App</b>
            <div className='container'>          
                <div className="container col-md-4">
                <h1> Home Page</h1> 
                <br></br>           
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.handleUserNameChange} />
                            <span style={{fontSize:15,color:"red"}} name="error" >
                            {this.state.errorUserName}
                        </span>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        <span style={{fontSize:15,color:"red"}} name="error">
                            {this.state.errorPassword}
                        </span>
                        </div>
                        {/* {
                        this.state.error &&
                        <div style={{fontSize:15,color:"red"}} data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}></button>
                            {this.state.error}
                        </div>
                    }
                         */}
                        <div className="form-group">
                            <input type="submit" value="Log In" name="submit" className='btn btn-primary' onClick={this.dismissError}/>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default Login;