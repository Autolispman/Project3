import React, { Component } from "react";
import API from "../../utils/API.js";
import ClientItem from "../Items/ClientItem.js"
class Client extends Component {
  state = {
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    startDate: "",
    endDate: "",
    typeOfAppointment: "",
    info: "",
    cellPhone: "",
    email: "",
    vetClinicName: "",
    vetName: "",
    vetPhone: "",
    keyInstructions: "",
    gateCode: "",
    doorCode: "",
    alarmCode: "",
    wifiPassword: "",
    notes: "",
    users: []
  };

  componentDidMount() {
    let prom = API.getAllUsers();
    prom.then(results => {
        console.log(results.data)
        this.setState({users: results.data})
    })  
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper indigo lighten-2">
            <a href="#!" className="brand-logo center">
              <h5>Sam's Pet Care</h5>
            </a>
          </div>
        </nav>
        <div className="container" />
        {this.state.users.map(user => (
            <ClientItem
              key={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
            />
          ))}
      </div>
    );
  }
}

export default Client;
