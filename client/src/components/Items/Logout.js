import React, { Component } from "react";
import firebase from "../../config/firebase.js"

class Logout extends Component {
  
  logout = () => {
    firebase.auth().signOut()
  }

  render() {
    return (      
        <button type="text" className="btn waves-effect waves-light" onClick={this.logout}>
          Logout
        </button>
    );
  }
}

export default Logout;
