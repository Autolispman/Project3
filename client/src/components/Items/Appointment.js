import React, { Component } from "react";
import API from "../../utils/API.js";
import moment from "moment";
import { Link } from "react-router-dom";
import "./appointment.css";

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
    typeOfAppointment: "",
    info: ""
  };

  componentDidMount() {
    this.setStateHelper();
  }

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
          startDate: moment(currentInfo.start).format("YYYY-MM-DDTHH:mm"),
          //startDate: "2018-09-04T00:01",
          endDate: moment(currentInfo.end).format("YYYY-MM-DDTHH:mm"),
          typeOfAppointment: currentInfo.info.typeOfAppointment,
          info: currentInfo.info
        });
      }
      window.localStorage.setItem("currentInfo", null);
      //console.log(this.state.info)
    } catch (err) {
      window.localStorage.setItem("currentInfo", null);
    }
  };

  createAppointment = event => {
    event.preventDefault();
    const userData = {
      id: this.state.info.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street1: this.state.street1,
      street2: this.state.street2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode
    };

    const appointmentData = {
      id: this.state.info.id,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      typeOfAppointment: this.state.typeOfAppointment
    };

    let prom = API.updateUser(userData);
    prom.then(result => {
      appointmentData.user_id = result.data.id
      let prom2 = API.updateAppointment(appointmentData);
      prom2.then(() => {
        window.location = "/calendar";
      })
    });

    // const appointmentData = {
    //   //id: this.state.info.id,
    //   id: 1,
    //   startDate: Date.now(),
    //   endDate: Date.now(),
    //   typeOfAppointment: this.state.typeOfAppointment
    //  };

    // API.updateAppointment(appointmentData)
  };

  deleteAppointment = () => {
    let prom = API.deleteAppointment(this.state.info.id);
    prom.then(data => {
      window.location.pathname = "/calendar";
    });
  };

  queryForRepeatClient = () => {
    let firstLastName = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    let prom = API.getUserByFirstAndLastName(firstLastName);
    prom.then(results => {
      if (this.state.firstName !== "" && this.state.lastName !== "") {
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
        if (this.state.zipCode === "" || this.state.ZipCode === undefined) {
          this.setState({ zipCode: results.data.zipCode });
        }
      }
    })
  };

  handleOnChange = event => {
    //console.log(this.state.info)
    //console.log(this.state.id)
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
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
                  checked={
                    this.state.typeOfAppointment === "PetTaxiPickUpDropOff"
                  }
                  required={true}
                />
                <span>Pet Taxi Pick Up/Drop Off</span>
              </label>
            </div>
          </form>
          <div className="grid-example col s12 m6">
            <button type="text" className="btn waves-effect waves-light" onClick={this.createAppointment}>
              Create/Update Appointment
            </button>
            <button type="text" className="btn waves-effect waves-light" onClick={this.deleteAppointment}>
              Delete Appointment
            </button>
            <Link to="/calendar" className="btn waves-effect waves-light">Disregard Changes</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Appointment;
