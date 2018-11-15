import React, { Component } from "react";
import API from "../../utils/API.js";
import { Link } from "react-router-dom";
import "../Items/appointment.css";
import PetItem from "../Items/PetItem.js";
import NewPetButton from "../Items/NewPetButton.js";

class User extends Component {
  state = {
    id: "",
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
    emergencyContactName: "",
    emergencyContactNumber: "",
    vetClinicName: "",
    vetName: "",
    vetPhone: "",
    keyInstructions: "",
    gateCode: "",
    doorCode: "",
    alarmCode: "",
    wifiPassword: "",
    notes: "",
    pets: []
  };

  componentDidMount() {
    let userData = {
      firstName: window.localStorage.getItem("firstName"),
      lastName: window.localStorage.getItem("lastName")
    };
    let prom = API.getUserByFirstAndLastName(userData);
    prom.then(result => {
      this.setState({
        id: result.data.id,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        street1: result.data.street1,
        street2: result.data.street2,
        city: result.data.city,
        state: result.data.state,
        zipCode: result.data.zipCode,
        startDate: result.data.startDate,
        endDate: result.data.endDate,
        typeOfAppointment: result.data.typeOfAppointment,
        info: result.data.info,
        cellPhone: result.data.cellPhone,
        email: result.data.email,
        emergencyContactName: result.data.emergencyContactName,
        emergencyContactNumber: result.data.emergencyContactNumber,
        vetClinicName: result.data.vetClinicName,
        vetName: result.data.vetName,
        vetPhone: result.data.vetPhone,
        keyInstructions: result.data.keyInstructions,
        gateCode: result.data.gateCode,
        doorCode: result.data.doorCode,
        alarmCode: result.data.alarmCode,
        wifiPassword: result.data.wifiPassword,
        notes: result.data.notes
      });
      this.getClientsPets(result.data.id);
    });
    window.localStorage.setItem("firstName", "");
    window.localStorage.setItem("lastName", "");
  }

  getClientsPets = id => {
    let user = { userId: id };
    let promPets = API.getPetsByUserId(user);
    promPets.then(result => {
      this.setState({ pets: result.data });
    });
  };

  createUser = event => {
    event.preventDefault();
    const userData = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street1: this.state.street1,
      street2: this.state.street2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      cellPhone: this.state.cellPhone,
      email: this.state.email,
      emergencyContactName: this.state.emergencyContactName,
      emergencyContactNumber: this.state.emergencyContactNumber,
      vetClinicName: this.state.vetClinicName,
      vetName: this.state.vetName,
      vetPhone: this.state.vetPhone,
      keyInstructions: this.state.keyInstructions,
      gateCode: this.state.gateCode,
      doorCode: this.state.doorCode,
      alarmCode: this.state.alarmCode,
      wifiPassword: this.state.wifiPassword,
      notes: this.state.notes
    };
    let prom = API.updateUser(userData);
    prom.then(result => {
      window.location = "/client";
    });
  };

  deleteUser = () => {
    let conf = window.confirm(
      `Do you really want to delete ${this.state.firstName}, ${
        this.state.lastName
      }`
    );
    if (conf) {
      let prom = API.deleteUser(this.state.id);
      prom.then(data => {
        window.location.pathname = "/client";
      });
    }
  };

  queryForRepeatClient = () => {
    let firstLastName = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    let prom = API.getUserByFirstAndLastName(firstLastName);
    prom.then(results => {
      if (this.state.firstName !== "" && this.state.lastName !== "") {
        if (this.state.id === "" || this.state.id === undefined) {
          this.setState({ id: results.data.id });
        }
        if (this.state.street1 === "" || this.state.street1 === undefined) {
          this.setState({ street1: results.data.street1 });
        }
        if (this.state.street2 === "" || this.state.street2 === undefined) {
          this.setState({ street2: results.data.street2 });
        }
        if (this.state.city === "" || this.state.city === undefined) {
          this.setState({ city: results.data.city });
        }
        if (this.state.state === "" || this.state.state === undefined) {
          this.setState({ state: results.data.state });
        }
        if (this.state.zipCode === "" || this.state.zipCode === undefined) {
          this.setState({ zipCode: results.data.zipCode });
        }
        if (this.state.cellPhone === "" || this.state.cellPhone === undefined) {
          this.setState({ cellPhone: results.data.cellPhone });
        }
        if (this.state.email === "" || this.state.email === undefined) {
          this.setState({ email: results.data.email });
        }
        if (this.state.emergencyContactName === "" || this.state.emergencyContactName === undefined) {
          this.setState({ emergencyContactName: results.data.emergencyContactName });
        }
        if (this.state.emergencyContactNumber === "" || this.state.emergencyContactNumber === undefined) {
          this.setState({ emergencyContactNumber: results.data.emergencyContactNumber });
        }
        if (
          this.state.vetClinicName === "" ||
          this.state.vetClinicName === undefined
        ) {
          this.setState({ vetClinicName: results.data.vetClinicName });
        }
        if (this.state.vetName === "" || this.state.vetName === undefined) {
          this.setState({ vetName: results.data.vetName });
        }
        if (this.state.vetPhone === "" || this.state.vetPhone === undefined) {
          this.setState({ vetPhone: results.data.vetPhone });
        }
        if (
          this.state.keyInstructions === "" ||
          this.state.keyInstructions === undefined
        ) {
          this.setState({ keyInstructions: results.data.keyInstructions });
        }
        if (this.state.gateCode === "" || this.state.gateCode === undefined) {
          this.setState({ gateCode: results.data.gateCode });
        }
        if (this.state.doorCode === "" || this.state.doorCode === undefined) {
          this.setState({ doorCode: results.data.doorCode });
        }
        if (this.state.alarmCode === "" || this.state.alarmCode === undefined) {
          this.setState({ alarmCode: results.data.alarmCode });
        }
        if (
          this.state.wifiPassword === "" ||
          this.state.wifiPassword === undefined
        ) {
          this.setState({ wifiPassword: results.data.wifiPassword });
        }
        if (this.state.notes === "" || this.state.notes === undefined) {
          this.setState({ notes: results.data.notes });
        }
      }
    });
  };

  handleOnChange = event => {
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  newPet = event => {
    let userData = {
      id: null,
      userId: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    window.localStorage.setItem("petInfo", JSON.stringify(userData));
    window.location.pathname = "/pet";
  };

  editPet = event => {
    let button = event.target;
    console.log(button);
    let userData = {
      id: null,
      userId: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      petName: button.getAttribute("data-petname")
    };
    window.localStorage.setItem("petInfo", JSON.stringify(userData));
    window.location.pathname = "/pet";
  };

  deletePet = event => {
    let button = event.target;
    console.log(button);
    let conf = window.confirm(
      `Do you really want to delete ${button.getAttribute("data-petname")}`
    );
    if (conf) {
      let prom = API.deletePet(parseInt(button.getAttribute("data-petid"), 10));
      prom.then(data => {
        this.getClientsPets(this.state.id);
      });
    }
  };

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
              <NewPetButton newPet={this.newPet} />
            </ul>
          </div>
        </nav>
        <div className="container">
          <form
            method=""
            action=""
            className="sm-col-12"
            onSubmit={this.createUser}
          >
            <label className="modalLabel">FirstName</label>
            <input
              name="firstName"
              type="text"
              id="firstNameInputId"
              className=""
              placeholder="firstName"
              required
              value={this.state.firstName}
              onChange={this.handleOnChange}
              onBlur={this.queryForRepeatClient}
            />
            <br />
            <label className="modalLabel">Last Name</label>
            <input
              name="lastName"
              type="text"
              id="lastNameInputId"
              className=""
              placeholder="lastName"
              required
              value={this.state.lastName}
              onChange={this.handleOnChange}
              onBlur={this.queryForRepeatClient}
            />
            <br />
            <label>Address</label>
            <label>Street1</label>
            <input
              name="street1"
              type="text"
              id="street1InputId"
              className=""
              placeholder="street1"
              required={false}
              value={this.state.street1}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Street2</label>
            <input
              name="street2"
              type="text"
              id="street2InputId"
              className=""
              placeholder="street2"
              required={false}
              value={this.state.street2}
              onChange={this.handleOnChange}
            />
            <br />
            <label>City</label>
            <input
              name="city"
              type="text"
              id="cityInputId"
              className=""
              placeholder="city"
              required={false}
              value={this.state.city}
              onChange={this.handleOnChange}
            />
            <br />
            <label>State</label>
            <input
              name="state"
              type="text"
              id="stateInputId"
              className=""
              placeholder="state"
              required={false}
              value={this.state.state}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Zip code</label>
            <input
              name="zipCode"
              type="text"
              id="zipCodeId"
              className=""
              placeholder="zipcode"
              required={false}
              pattern="^\d{5}$|^\d{5}-\d{4}$"
              value={this.state.zipCode}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Cell Phone</label>
            <input
              name="cellPhone"
              type="text"
              id="cellPhoneId"
              className=""
              placeholder="cellPhone"
              required={false}
              pattern="^[2-9]\d{2}-\d{3}-\d{4}$"
              value={this.state.cellPhone}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Email Address</label>
            <input
              name="email"
              type="text"
              id="emailId"
              className=""
              placeholder="email"
              required={false}
              pattern="(\w+?@\w+?\x2E.+)"
              value={this.state.email}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Emergency Contact Name</label>
            <input
              name="emergencyContactName"
              type="text"
              id="emergencyContactNameId"
              className=""
              placeholder="emergencyContactName"
              required={false}
              value={this.state.emergencyContactName}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Emergency Contact Number</label>
            <input
              name="emergencyContactNumber"
              type="text"
              id="emergencyContactNumberId"
              className=""
              placeholder="emergencyContactNumber"
              required={false}
              pattern="^[2-9]\d{2}-\d{3}-\d{4}$"
              value={this.state.emergencyContactNumber}
              onChange={this.handleOnChange}
            />
            <label>Vet Clinic Name</label>
            <input
              name="vetClinicName"
              type="text"
              id="vetClinicNameId"
              className=""
              placeholder="vetClinicName"
              required={false}
              value={this.state.vetClinicName}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Vet Name</label>
            <input
              name="vetName"
              type="text"
              id="vetNameId"
              className=""
              placeholder="vetName"
              required={false}
              value={this.state.vetName}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Vet Phone</label>
            <input
              name="vetPhone"
              type="text"
              id="vetPhoneId"
              className=""
              placeholder="vetPhone"
              required={false}
              pattern="^[2-9]\d{2}-\d{3}-\d{4}$"
              value={this.state.vetPhone}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Key Instructions</label>
            <input
              name="keyInstructions"
              type="text"
              id="keyInstructionsId"
              className=""
              placeholder="keyInstructions"
              required={false}
              value={this.state.keyInstructions}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Gate Code</label>
            <input
              name="gateCode"
              type="text"
              id="gateCodeId"
              className=""
              placeholder="gateCode"
              required={false}
              value={this.state.gateCode}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Door Code</label>
            <input
              name="doorCode"
              type="text"
              id="doorCodeId"
              className=""
              placeholder="doorCode"
              required={false}
              value={this.state.doorCode}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Alarm Code</label>
            <input
              name="alarmCode"
              type="text"
              id="alarmCodeId"
              className=""
              placeholder="alarmCode"
              required={false}
              value={this.state.alarmCode}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Wifi Password</label>
            <input
              name="wifiPassword"
              type="text"
              id="wifiPasswordId"
              className=""
              placeholder="wifiPassword"
              required={false}
              value={this.state.wifiPassword}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Client Notes</label>
            <textarea
              name="notes"
              type="text"
              id="notesId"
              className=""
              placeholder="notes"
              required={false}
              value={this.state.notes}
              onChange={this.handleOnChange}
            />
            <br />
            <br />
            <button type="text" className="btn waves-effect waves-light">
              Create/Update User
            </button>
          </form>
          <br />
          <div className="grid-example col s12 m6">
            <button
              type="text"
              className="btn waves-effect red"
              onClick={this.deleteUser}
            >
              Delete Client
            </button>
            <Link to="/client" className="btn waves-effect yellow darken-2">
              Disregard Changes
            </Link>
          </div>
          <br />
          {this.state.pets.map(pet => (
            <PetItem
              key={pet.id}
              petId={pet.id}
              petName={pet.petName}
              breed={pet.breed}
              age={pet.age}
              gender={pet.gender}
              fixed={pet.fixed}
              crateTrained={pet.crateTrained}
              houseTrained={pet.houseTrained}
              feedingInstructions={pet.feedingInstructions}
              medications={pet.medications}
              healthIssues={pet.healthIssues}
              notes={pet.notes}
              editPet={this.editPet}
              deletePet={this.deletePet}
            />
          ))}
          <br />
          <NewPetButton newPet={this.newPet} />
          <br />
        </div>
      </div>
    );
  }
}

export default User;
