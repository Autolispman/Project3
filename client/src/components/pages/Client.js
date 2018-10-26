import React, { Component } from "react";
import API from "../../utils/API.js";
import ClientItem from "../Items/ClientItem.js";
import HomeButton from "../Items/HomeButton.js";
import NewUserButton from "../Items/NewUserButton.js";
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
    users: [],
    filter: "",
    filteredUsers: []
  };

  componentDidMount() {
    let prom = API.getAllUsers();
    prom.then(results => {
      console.log(results.data);
      this.setState({ users: results.data });
      this.setState({ filteredUsers: results.data });
    });
  }

  runFilter = event => {
    this.setState({ filter: event.target.value });
    this.setState({ filteredUsers: [] });
    let arr = [];
    this.state.users.forEach(element => {
      if (
        element.lastName
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase())
      ) {
        arr.push(element);
        this.setState({ filteredUsers: arr });
      } else {
        if (
          element.firstName
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase())
        ) {
          arr.push(element);
          this.setState({ filteredUsers: arr });
        }
      }
    });
  };

  editClient = event => {
    let tag = event.target;
    let firstName = tag.getAttribute("data-firstname");
    let lastName = tag.getAttribute("data-lastname");
    window.localStorage.setItem("firstName", firstName);
    window.localStorage.setItem("lastName", lastName);
    window.location.pathname = "/user";
  };

  newClient = () => {
    window.location.pathname = "/user";
  }

  goHome = () => {
    window.location.pathname = "/";
  }

  render() {
    return (
      <div>
        <nav className="nav-extended indigo lighten-2">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo center">
              <h5>Sam's Pet Care</h5>
            </a>
          </div>
          <div className="nav-content">
            <ul className="buttons tabs tabs-transparent">
              <HomeButton
              goHome={this.goHome} />
              <NewUserButton
              newClient={this.newClient} />
            </ul>
          </div>
        </nav>
        <label>Filter</label>
        <input
          type="Text"
          onChange={this.runFilter}
          value={this.state.filter}
        />
        <div className="container">
          {this.state.filteredUsers.map(user => (
            <ClientItem
              key={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              editClient={this.editClient}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Client;
