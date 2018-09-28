//import React from "react";
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../utils/API.js";
import moment from "moment";
import { Link } from "react-router-dom";

class Appointment extends Component {
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
    typeOfAppointment: ""
  };

  componentDidMount() {
    try {
      let currentInfo = window.localStorage.getItem("currentInfo");
      if (currentInfo !== null) {
        currentInfo = JSON.parse(currentInfo);
        //console.log(currentInfo.info.typeOfAppointment);
        //console.log(moment(currentInfo.start).format("YYYY-MM-DDThh:mm:ss"))
        console.log(currentInfo.start) 
        this.setState(
          {
            firstName: currentInfo.info.User.firstName,
            lastName: currentInfo.info.User.lastName,
            street1: currentInfo.info.User.street1,
            street2: currentInfo.info.User.street2,
            city: currentInfo.info.User.city,
            state: currentInfo.info.User.state,
            zipCode: currentInfo.info.User.zipCode,
            startDate: moment(currentInfo.start)
              .format("YYYY-MM-DDThh:mm:ss"),
            //startDate: "2018-09-04T12:01:00",
            endDate: moment(currentInfo.end)
            .format("YYYY-MM-DDThh:mm:ss"),
            typeOfAppointment: currentInfo.info.typeOfAppointment,
            info: currentInfo.info
          },
          () => console.log(this.state)
        );
      }
      window.localStorage.setItem("currentInfo", null);
    } catch (err) {
      window.localStorage.setItem("currentInfo", null);
    }
  }

  createAppointment = event => {
    event.preventDefault();
    console.log(this.state.startDate)
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street1: this.state.street1,
      street2: this.state.street2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      typeOfAppointment: this.state.typeOfAppointment
    };
    API.createAppointment(data);
  };

  deleteAppointment = () => {
    let prom = API.deleteAppointment(this.state.info.id);
    prom.then(data => {
      window.location.pathname = "/calendar"
    })
  };

  handleOnChange = event => {
    let { name, value } = event.target;
    console.log("-----");
    console.log(name);
    console.log(value);
    console.log(
      moment(value)
        .add(1, "s")
        .toString()
    );
    this.setState(
      {
        [name]: value
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div className="container">
        <form
          method=""
          action=""
          className="sm-col-12"
          onSubmit={this.createAppointment}
          action="#"
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
          <label>Start Date (ex: 4/27/2010)</label>
          <input
            name="startDate"
            type="datetime-local"
            id="startDateId"
            className=""
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
            className=""
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
                value="PetOverNightSit"
                checked={this.state.typeOfAppointment === "PetOverNightSit"}
                required={true}
              />
              <span>Pet Over Night Sit</span>
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="typeOfAppointment"
                //defaultValue="PetBoarding"
                onChange={this.handleOnChange}
                value="PetBoarding"
                checked={this.state.typeOfAppointment === "PetBoarding"}
                required={true}
              />
              <span>Pet Boarding</span>
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="typeOfAppointment"
                //defaultValue="PetVisit"
                onChange={this.handleOnChange}
                value="PetVisit"
                checked={this.state.typeOfAppointment === "PetVisit"}
                required={true}
              />
              <span>Pet Vist</span>
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="typeOfAppointment"
                // defaultValue="DogWalking"
                onChange={this.handleOnChange}
                value="DogWalking"
                checked={this.state.typeOfAppointment === "DogWalking"}
                required={true}
              />
              <span>Dog Walking</span>
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="typeOfAppointment"
                //defaultValue="PetTaxiPickUpDropOff"
                onChange={this.handleOnChange}
                value="PetTaxiPickUpDropOff"
                checked={this.state.typeOfAppointment === "PetTaxiPickUpDropOfft"}
                required={true}
              />
              <span>Pet Taxi Pick Up/Drop Off</span>
            </label>
          </div>
          <button type="text" className="btn waves-effect waves-light">
            Create/Update Appointment
          </button>
        </form>
        <button type="text" className="btn waves-effect waves-light" onClick={this.deleteAppointment}>
          Delete Appointment
        </button>
        <Link to="/calendar">Disregard Changes</Link>
      </div>
    );
  }
}

export default Appointment;
