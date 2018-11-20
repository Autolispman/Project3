import React, { Component } from "react";
import API from "../../utils/API.js";
import moment from "moment";
import { Link } from "react-router-dom";
import "./appointment.css";
import PetItem from "../Items/PetItem.js";

class Appointment extends Component {
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
    vetClinicName: "",
    vetName: "",
    vetPhone: "",
    keyInstructions: "",
    gateCode: "",
    doorCode: "",
    alarmCode: "",
    wifiPassword: "",
    notes: "",
    appointmentNotes: "",
    pets: [],
    showCheckbox: true,
    petsAndMore: []
  };

  componentDidMount() {
    this.setup();
  }

  setup = async function() {
    await this.setStateHelper();
    this.getClientsPets();
  };

  setStateHelper = () => {
    try {
      let currentInfo = window.localStorage.getItem("currentInfo");
      if (currentInfo !== null) {
        currentInfo = JSON.parse(currentInfo);
        //console.log(currentInfo.info.typeOfAppointment);
        //console.log(moment(currentInfo.start).format("YYYY-MM-DDTHH:mm"))
        //console.log(currentInfo.info)
        this.setState({
          firstName: currentInfo.info.User.firstName,
          lastName: currentInfo.info.User.lastName,
          street1: currentInfo.info.User.street1,
          street2: currentInfo.info.User.street2,
          city: currentInfo.info.User.city,
          state: currentInfo.info.User.state,
          zipCode: currentInfo.info.User.zipCode,
          cellPhone: currentInfo.info.User.cellPhone,
          email: currentInfo.info.User.email,
          vetClinicName: currentInfo.info.User.vetClinicName,
          vetName: currentInfo.info.User.vetName,
          vetPhone: currentInfo.info.User.vetPhone,
          keyInstructions: currentInfo.info.User.keyInstructions,
          gateCode: currentInfo.info.User.gateCode,
          doorCode: currentInfo.info.User.doorCode,
          alarmCode: currentInfo.info.User.alarmCode,
          wifiPassword: currentInfo.info.User.wifiPassword,
          notes: currentInfo.info.User.notes,
          appointmentNotes: currentInfo.info.appointmentNotes,
          startDate: moment(currentInfo.start).format("YYYY-MM-DDTHH:mm"),
          //startDate: "2018-09-04T00:01",
          endDate: moment(currentInfo.end).format("YYYY-MM-DDTHH:mm"),
          typeOfAppointment: currentInfo.info.typeOfAppointment,
          info: currentInfo.info
        });
      }
      //window.localStorage.setItem("currentInfo", null);
      //console.log(this.state.info)
    } catch (err) {
      //window.localStorage.setItem("currentInfo", null);
    }
  };

  getClientsPets = id => {
    let user = { userId: this.state.info.UserId };
    console.log(user);
    let promPets = API.getPetsByUserId(user);
    promPets.then(result => {
      //console.log(result);
      this.setState({ pets: result.data }, () => {
        //console.log(this.state.pets);
        let petsAndMore = [...this.state.pets];
        for (let i = 0; i < petsAndMore.length; i++) {
          petsAndMore[i] = { ...petsAndMore[i], checked: false };
          //console.log(petsAndMore[i]);
        }
        this.setState({ petsAndMore: petsAndMore });
      });
    });
  };

  createAppointment = event => {
    event.preventDefault();
    let checkedPets = this.getCheckedPets();
    const userData = {
      id: this.state.info.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street1: this.state.street1,
      street2: this.state.street2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      cellPhone: this.state.cellPhone,
      email: this.state.email,
      vetClinicName: this.state.vetClinicName,
      vetName: this.state.vetName,
      vetPhone: this.state.vetPhone,
      keyInstructions: this.state.keyInstructions,
      gateCode: this.state.gateCode,
      doorCode: this.state.doorCode,
      alarmCode: this.state.alarmCode,
      wifiPassword: this.state.wifiPassword,
      notes: this.state.notes,
      appointmentNotes: this.state.appointmentNotes
    };

    const appointmentData = {
      id: this.state.info.id,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      typeOfAppointment: this.state.typeOfAppointment,
      appointmentNotes: this.state.appointmentNotes,
      petsToSit: checkedPets
    };

    let prom = API.updateUser(userData);
    prom.then(result => {
      appointmentData.user_id = result.data.id;
      let prom2 = API.updateAppointment(appointmentData);
      prom2.then(() => {
        window.location = "/calendar";
      });
    });
  };

  deleteAppointment = () => {
    let conf = window.confirm(
      `Do you really want to delete ${this.state.typeOfAppointment}`
    );
    if (conf) {
      let prom = API.deleteAppointment(this.state.info.id);
      prom.then(data => {
        window.location.pathname = "/calendar";
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
        if (
          this.state.appointmentNotes === "" ||
          this.state.appointmentNotes === undefined
        ) {
          this.setState({ appointmentNotes: results.data.appointmentNotes });
        }
      }
    });
  };

  handleOnChange = event => {
    //console.log(this.state.info)
    //console.log(this.state.id)
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  getCheckedPets = () => {
    let checkedPets = [];
    for (let i = 0; i < this.state.petsAndMore.length; i++) {
      if (this.state.petsAndMore[i].checked) {
        checkedPets.push(this.state.petsAndMore[i].petName);
      }
    }
    return checkedPets.toString()
  };

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
        <div className="container">
          <form
            method=""
            action=""
            className="sm-col-12"
            onSubmit={this.createAppointment}
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
            <label>appointmentData Notes</label>
            <textarea
              name="appointmentNotes"
              type="text"
              id="appointmentNotesId"
              className=""
              placeholder="appointmentNotes"
              required={false}
              value={this.state.appointmentNotes}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Start Date (ex: 4/27/2010)</label>
            <input
              name="startDate"
              type="datetime-local"
              id="startDateId"
              className="datepicker"
              placeholder="start date"
              required={true}
              pattern="^\d{1,2}\/\d{1,2}\/\d{4}$"
              value={this.state.startDate}
              onChange={this.handleOnChange}
            />
            <br />
            <label>End Date (ex: 4/27/2010)</label>
            <input
              name="endDate"
              type="datetime-local"
              id="endDateId"
              className="datepicker"
              placeholder="end date"
              required={true}
              pattern="^\d{1,2}\/\d{1,2}\/\d{4}$"
              value={this.state.endDate}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Type of Appointment</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="typeOfAppointment"
                  //defaultValue="MeetAndGreet"
                  onChange={this.handleOnChange}
                  value="MeetAndGreet"
                  checked={this.state.typeOfAppointment === "MeetAndGreet"}
                  required={true}
                />
                <span>Meet And Greet</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="typeOfAppointment"
                  //defaultValue="HouseSit"
                  onChange={this.handleOnChange}
                  value="HouseSit"
                  checked={this.state.typeOfAppointment === "HouseSit"}
                  required={true}
                />
                <span>House Sit</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="typeOfAppointment"
                  //defaultValue="PetOverNightSit"
                  onChange={this.handleOnChange}
                  value="OverNightPetSit"
                  checked={this.state.typeOfAppointment === "OverNightPetSit"}
                  required={true}
                />
                <span>Overnight Pet Sit</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="typeOfAppointment"
                  //defaultValue="PetBoarding"
                  onChange={this.handleOnChange}
                  value="Boarding"
                  checked={this.state.typeOfAppointment === "Boarding"}
                  required={true}
                />
                <span>Boarding</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="typeOfAppointment"
                  //defaultValue="PetVisit"
                  onChange={this.handleOnChange}
                  value="Visit"
                  checked={this.state.typeOfAppointment === "Visit"}
                  required={true}
                />
                <span>Visit</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="typeOfAppointment"
                  // defaultValue="DogWalking"
                  onChange={this.handleOnChange}
                  value="Walk"
                  checked={this.state.typeOfAppointment === "Walk"}
                  required={true}
                />
                <span>Walk</span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="typeOfAppointment"
                  //defaultValue="PetTaxiPickUpDropOff"
                  onChange={this.handleOnChange}
                  value="TaxiPickUpDropOff"
                  checked={this.state.typeOfAppointment === "TaxiPickUpDropOff"}
                  required={true}
                />
                <span>Taxi Pick Up/Drop Off</span>
              </label>
              <br />
            </div>
            <button type="text" className="btn waves-effect waves-light">
              Create/Update Appointment
            </button>
          </form>
          <div className="grid-example col s12 m6">
            <button
              type="text"
              className="btn waves-effect red"
              onClick={this.deleteAppointment}
            >
              Delete Appointment
            </button>
            <Link to="/calendar" className="btn waves-effect yellow darken-2">
              Disregard Changes
            </Link>
          </div>
          <div>
          {this.state.pets.map(pet => (
            <PetItem
              key={pet.id}
              petId={pet.id}
              petName={pet.petName}
              breed={pet.breed}
              birthday={pet.birthday}
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
              showCheckbox= {this.state.showCheckbox}
              petsAndMore={this.state.petsAndMore}
            />
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Appointment;
