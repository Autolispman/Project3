//import React from "react"
import React, { Component } from "react";
import "../../App.css";
import LoginItem from "../Items/LoginItem.js";
import firebase from "../../config/firebase.js"

class Login extends Component {
  state = {
    adminUserName: "",
    adminPW: "",
    message: ""
  };

  handleLoginChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  processAdminLogin = event => {
    event.preventDefault();
    // //const samName = this.state.adminUserName;
    // //const samPW = this.state.adminPW;
    // const samLogsIn = {
    //   username: this.state.adminUserName,
    //   password: this.state.adminPW
    // };
    // if (!samLogsIn.username || !samLogsIn.password) {
    //   this.setState({message: "Username and password are required"})
    //   return;
    // }
  
    // API.loginUser(samLogsIn);
    // this.setState({ adminUserName: "" });
    // this.setState({ adminPW: "" });
    firebase.auth().signInWithEmailAndPassword(this.state.adminUserName, this.state.adminPW).then((u) => {
      console.log(u)
      }).catch((error) => {
        console.log(error)
      })
  };

  render() {
    return (
      
      <div>
        <LoginItem
          processAdminLogin={this.processAdminLogin}
          adminUserName={this.state.adminUserName}
          adminPW={this.state.adminPW}
          handleLoginChange={this.handleLoginChange}
          message={this.state.message}
        
          
        />
      </div>
      
    );
  }
}

export default Login;
